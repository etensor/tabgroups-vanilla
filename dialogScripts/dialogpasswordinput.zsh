# --insecure -> display * : show something is being typed.
#
RES=$(dialog --title "Dialog Aspero\!" --insecure --passwordbox "Enter your password: " 0 0 3>&1 1>&2 2>&3 3>&-)
clear
echo "RES : $RES" 
