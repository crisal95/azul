# Ejemplo en clase con Angular 8

## Prerequisitos

- [NodeJS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Cliente de Git. En clase usamos [Github Desktop](https://desktop.github.com/)

## Instalación [Angular CLI](https://github.com/angular/angular-cli)

El CLI de Angular es necesario para la creación de proyectos nuevos.

```shell
npm install -g @angular/cli@8.1.0
```

Si ya tenían otra versión de Angular CLI instalada, es necesario desinstalar la versión anterior y luego instalar la versión 8.1.0

```shell
# Desinstalar la versión anterior
npm uninstall -g @angular/cli

# Instalar la version 8.1.0
npm install -g @angular/cli@8.1.0
```

## Plugins para Visual Studio Code

Estos plugins harán la vida más fácil a la hora de trabajar con Angular 8 en VSCode. Los pueden instalar directamente desde la interfaz gráfica de la aplicación:

```
johnpapa.angular-essentials
angular.ng-template
johnpapa.angular2
natewallace.angular2-inline
anseki.vscode-color
dbaeumer.vscode-eslint
esbenp.prettier-vscode
TSLintms-vscode.vscode-typescript-tslint-plugin
mrmlnc.vscode-csscomb
eamodio.gitlens
```

También pueden instalar los plugins mediante la línea de comandos, utilizando el comando `code --install-extension`, por ejemplo:

```shell
code --install-extension johnpapa.angular-essentials
```

## Correr la aplicación en modo desarrollo

Luego de bajar el código de Git, es necesario instalar las dependencias de npm, mediante el comando:

```shell
npm install
```

Luego, para correr el programa en Angular se debe ejecutar este comando:

```shell
ng serve
```

Y pueden visitar la aplicación en el URL `http://localhost:4200/`

## Construcción del Proyecto

Cuando el proyecto esté listo para instalar en un servidor web (Apache, NGINX), es necesario convertirlo de Typescript a Javascript, mediante el comando:

```shell
npm build
```

Con el parámetro `--prod` se construye listo par el ambiente de producción (más eficiente)

```shell
npm build --prod
```

## Pruebas de Unidad (tema futuro)

Las pruebas de unidad se escriben en Jasmine, y son ejecutados por Karma, mediante el comando:

```shell
ng test
```

## Generación de Código

El comando `ng generate component component-name` se utiliza para generar un componente nuevo. También puede usarse para generar otros componentes, como directivas, _pipes_ y servicios: `ng generate directive|pipe|service|class|guard|interface|enum|module`.
