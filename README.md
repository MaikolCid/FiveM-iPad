# FiveM
asd
Here you can see the FiveM vault

For cloning the repository:
```
git clone https://gitlab.lrz.de/00000000014BA86C/FiveM.git
```

Setting up, and committing and pushing repository:
```
git init
git remote add origin https://gitlab.lrz.de/00000000014BA86C/FiveM.git
git branch -M main
git add . (To add all the files in the folder)
git commit -m "Example of input"
git push -uf origin main
```

To pull the repository:
```
git pull origin main
```

To store credentials:
```
git config --global credential.helper store (And then introduce credentials again.)
```
To remove stored credentials:
```
git config --global --unset credential.helper (When date of token expires)
```

Quickly one comand to add, commit and push:
```
git add . && git commit -m "Example" && git push origin main
```
For Username: go72nof
Password: Create new Token