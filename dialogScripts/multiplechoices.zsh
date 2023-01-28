VAR=$(dialog --title "Select a choice" --menu "Ports:" 0 0 0 \
  "Epale" "Server 1:/1892" \
  2 "Server 2:/9324" \
  "Sisas" "Server 3:/7543" \
  4: "/41563" \
  3>&1 1>&2 2>&3 3>&-
)

echo "Ans => $VAR"
