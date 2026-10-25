#!/usr/bin/env python3
"""
Sincroniza as fotos dos ADMs com as redes sociais.

Para cada ADM, baixa a foto pública atual (GitHub ou LinkedIn), recorta em
quadrado, redimensiona, aplica nitidez leve e grava em main/img/adms/.
O arquivo só é reescrito quando a foto muda de verdade, para não gerar
commits vazios.

Uso local:
    pip install pillow
    python scripts/sync-adms-fotos.py

O GitHub Actions roda isso todo dia (.github/workflows/sync-adms-fotos.yml).
"""

import hashlib
import io
import os
import sys
import urllib.error
import urllib.request

from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTINO = os.path.join(ROOT, "main", "img", "adms")

# tamanho final do arquivo (o card exibe ~300px; 640 cobre telas Retina)
TAMANHO = 640
QUALIDADE = 92

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
)

# arquivo local -> (rede, identificador na rede)
# GitHub: usuário. LinkedIn: slug do perfil.
FONTES = {
    "gabriel-cunha.jpg": ("github", "GabrielCNSouza"),
    "douglas-viktor.jpg": ("linkedin", "douglas-viktor-a3422b343"),
    "railana.jpg": ("github", "Railana-Ramos"),
    "vanessa.jpg": ("github", "euvanessadev"),
    "denis.jpg": ("github", "DenisDev-H"),
    "kauan-oliveira.jpg": ("github", "settby"),
    "joao-calil.jpg": ("github", "joaocalil26"),
    "viviane-santos.jpg": ("github", "souavivisantos"),
}


def url_da_foto(rede, identificador):
    if rede == "github":
        # 460 é o maior tamanho que o GitHub serve; acima disso ele ignora.
        return f"https://github.com/{identificador}.png?size=460"
    if rede == "linkedin":
        # O LinkedIn bloqueia acesso direto (HTTP 999). O unavatar resolve a
        # foto pública; o LinkedIn só disponibiliza 200x200.
        return f"https://unavatar.io/linkedin/{identificador}?fallback=false"
    raise ValueError(f"rede desconhecida: {rede}")


def baixar(url):
    requisicao = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "image/*"},
    )
    with urllib.request.urlopen(requisicao, timeout=45) as resposta:
        if resposta.status != 200:
            raise RuntimeError(f"HTTP {resposta.status}")
        return resposta.read()


def tratar(conteudo):
    imagem = Image.open(io.BytesIO(conteudo))
    imagem.load()
    imagem = imagem.convert("RGB")

    largura, altura = imagem.size
    lado = min(largura, altura)
    esquerda = (largura - lado) // 2
    topo = (altura - lado) // 2
    imagem = imagem.crop((esquerda, topo, esquerda + lado, topo + lado))

    ampliacao = TAMANHO / lado
    if lado != TAMANHO:
        imagem = imagem.resize((TAMANHO, TAMANHO), Image.LANCZOS)

    # nitidez um pouco mais forte quando a origem é pequena (caso do LinkedIn)
    percentual = 85 if ampliacao > 1.8 else 70
    imagem = imagem.filter(
        ImageFilter.UnsharpMask(radius=1.1, percent=percentual, threshold=3)
    )

    saida = io.BytesIO()
    imagem.save(
        saida,
        "JPEG",
        quality=QUALIDADE,
        optimize=True,
        progressive=True,
        subsampling=0,
    )
    return saida.getvalue(), lado


def main():
    os.makedirs(DESTINO, exist_ok=True)
    atualizados = []
    falhas = []

    for arquivo, (rede, identificador) in FONTES.items():
        destino = os.path.join(DESTINO, arquivo)
        url = url_da_foto(rede, identificador)

        try:
            original = baixar(url)
            novo, lado_origem = tratar(original)
        except (urllib.error.URLError, RuntimeError, OSError) as erro:
            falhas.append(f"{arquivo}: {erro}")
            print(f"[falhou] {arquivo}: {erro}")
            continue

        anterior = b""
        if os.path.exists(destino):
            with open(destino, "rb") as atual:
                anterior = atual.read()

        if hashlib.sha256(anterior).digest() == hashlib.sha256(novo).digest():
            print(f"[igual]  {arquivo} ({lado_origem}px na origem)")
            continue

        with open(destino, "wb") as saida:
            saida.write(novo)
        atualizados.append(arquivo)
        print(f"[novo]   {arquivo} ({lado_origem}px na origem)")

    print()
    print(f"{len(atualizados)} foto(s) atualizada(s), {len(falhas)} falha(s).")

    # Falha de uma rede não deve derrubar o job: mantém a foto anterior.
    if falhas:
        print("Mantidas as versões anteriores de: " + ", ".join(falhas))
        with open(os.environ.get("GITHUB_STEP_SUMMARY", os.devnull), "a") as resumo:
            resumo.write("### Fotos não atualizadas\n\n")
            for falha in falhas:
                resumo.write(f"- {falha}\n")

    return 0


if __name__ == "__main__":
    sys.exit(main())
