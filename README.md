# README del Proyecto Full Stack (Zach Services - Prueba Técnica)

Este proyecto es una aplicación Full Stack desarrollada como prueba técnica para Zach Services. La aplicación se ejecuta completamente en contenedores Docker para simplificar la configuración y el despliegue.

---

## Prerrequisitos

Estas instrucciones asumen que estás utilizando el sistema operativo **Ubuntu**. El único prerrequisito es tener Docker instalado y configurado en tu sistema.

### Docker

Se recomienda seguir la documentación oficial de Docker para la instalación. Aquí se detallan los pasos básicos para Ubuntu, y puedes encontrar la guía completa en <https://docs.docker.com/engine/install/ubuntu/>.

1.  **Añadir la clave GPG oficial de Docker y el repositorio:**
    ```bash
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL [https://download.docker.com/linux/ubuntu/gpg](https://download.docker.com/linux/ubuntu/gpg) -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    echo       "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] [https://download.docker.com/linux/ubuntu](https://download.docker.com/linux/ubuntu)       $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" |       sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    ```

2.  **Instalar los paquetes de Docker:**
    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

---

## Ejecución del Proyecto

El proyecto está configurado para ser ejecutado con Docker Compose, lo que iniciará tanto el frontend como el backend con un solo comando.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/gerardoluceroc/prueba-tecnica-zach.git
cd prueba-tecnica-zach/
```

### 2. Ejecutar con Docker Compose

Para iniciar todos los servicios del proyecto:

* **Para ejecutar en primer plano (ver logs en la terminal):**
    ```bash
    docker compose up --build
    ```

* **Para ejecutar en segundo plano (modo 'detached'):**
    ```bash
    docker compose up --build -d
    ```

---

## Acceso a la Aplicación y la API

Una vez que los contenedores estén en funcionamiento, puedes acceder a los servicios en las siguientes direcciones:

* **Aplicación Frontend (React/Vite):**
    ```
    http://localhost:5173
    ```

* **Documentación de la API Backend (Swagger):**
    ```
    http://localhost:8080/api
    ```
