
RES=$(dialog --inputbox "Enter your password: " 0 0 3>&1 1>&2 2>&3 3>&-)
echo "RES : $RES" 
