# FiveM Tablet

This project is a custom-built tablet UI for FiveM, providing in-game players with easy access to various functionalities like music, settings, a calculator, and more. The tablet features interactive elements with a sleek, mobile-inspired interface, allowing players to manage game settings, browse wallpapers, and listen to music tracks directly in-game.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Commands](#commands)
- [Events](#events)
- [License](#license)

## Features

- **Tablet UI**: A fully interactive tablet interface with a customizable background.
- **Settings**: Adjust in-game settings like Wi-Fi, Bluetooth, and wallpaper.
- **Music Player**: Listen to a selection of in-game music tracks.
- **Calculator**: Simple calculator app for quick in-game calculations.
- **Wallpaper Selection**: Choose and save wallpapers in the settings menu.
- **Volume Control**: Integrated volume buttons to adjust sound levels.

## Installation

1. **Clone or Download** this repository and add it to your FiveM resources folder.

    ```bash
    git clone https://github.com/your-repo/FiveM-Tablet.git
    ```

2. **Ensure Dependencies**:
   - Install [MySQL Async](https://github.com/brouznouf/fivem-mysql-async) for database support.
   - Include **FontAwesome** for icon support.
   - Set up **PDF.js** if PDF viewing support is required.

3. **Configure Database**:
   - Run the provided SQL setup script (`ajustes.sql`) to create the necessary tables for saving user preferences like wallpapers.

4. **Add to server.cfg**:

    ```cfg
    ensure FiveM-Tablet
    ```

5. **Start the server** and the tablet will be available as a command in-game.

## Usage

### In-Game Command
Use the following command in-game to open the tablet:

```plaintext
/tablet
