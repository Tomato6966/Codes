#/bin/sh
APP_WEB_URL=$(curl -sL https://www.deezer.com/en/channels/explore | grep -Po "(?<=(script src=\"))https:\/\/[a-z-\.\/]+app-web[a-z0-9\.]+")
APP_WEB=$(curl -sL $APP_WEB_URL)
T1=$(printf "$(echo $APP_WEB | grep -Po "%5B0x61(%2C0x[0-9a-z+]+)+%2C0x67%5D" | sed -e 's/%5B//g' -e 's/%2C//g' -e 's/%5D//g' -e 's/0x/\\x/g')" | rev)
T2=$(printf "$(echo $APP_WEB | grep -Po "%5B0x31(%2C0x[0-9a-z+]+)+%2C0x34%5D" | sed -e 's/%5B//g' -e 's/%2C//g' -e 's/%5D//g' -e 's/0x/\\x/g')" | rev)
FINAL=""
for i in 1 2 3 4 5 6 7 8
do
  FINAL=$FINAL$(echo $T1 | cut -c$i)
  FINAL=$FINAL$(echo $T2 | cut -c$i)
done
echo $FINAL
