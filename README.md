# Notes

Brite е йерархична структура, каквото съществува в KEGG базата от данни.

Идентацията посочва подкатегориите.

Пример:

```txt
BRITE       Therapeutic category of drugs in Japan [BR:br08301]
             5  Crude drugs and Chinese medicine formulations
              51  Crude drugs
               510  Crude drugs
                5100  Crude drugs
                 D05431  Mentha herb (JP17); Peppermint (NF)
```

В случая са основната категория е Therapeutic category of drugs in Japan, подкатегория Crude drugs, която се повтаря 3 пъти по неясни за мен причини, може да е артефакт и съдържанието е с код D05431 и текст Mentha herb (JP17); Peppermint (NF).

Някои от категориите са индексирани с код преди самото име, но има и такива, които нямат код.

Структурата на списъка е плоска