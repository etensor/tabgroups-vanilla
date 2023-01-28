#!/usr/bin/zsh
#
if [ -z "$@" ]
then
    TEX_EQUATION="p' = \frac{p}{1-q^2s}"
else
    TEX_EQUATION="$@"
fi

beginning='\documentclass{article}\pagestyle{empty}\begin{document}'

template="${TEX_EQUATION}\\end{document}"


printf $beginning "$template" > ./formula.tex
texi2dvi ./formula.tex
dvips -E formula.dvi
convert -density 300 -quality 90 formula.ps formula.png
