# eventmacro-syntax README

![License](https://img.shields.io/github/license/alisonrag/vsce-eventmacro-language-support)  
![Issues](https://img.shields.io/github/issues/alisonrag/vsce-eventmacro-language-support)

A lightweight VSCode extension that provides syntax highlighting for OpenKore's eventMacro scripting language.

## Features

- 🎨 Syntax highlighting and code completion for eventMacros files
- ⚙️ Supports macro and automacro definitions
- 🔍 Highlights commands, conditions, variables, and special functions
- 💬 Comment, string, and number detection
- 📂 Automatic code block folding

## Release Notes

### 1.0.0

Initial release of extension

---

## 📦 Installation

1. Open **Visual Studio Code**
2. Go to the **Extensions View** (`Ctrl+Shift+X`)
3. Search for **`eventMacro Syntax Highlighter`**
4. Click **Install**

Or install via CLI:

```bash
code --install-extension OpenKore.eventmacro-syntax
```

---

## 🚀 Usage

This extension automatically highlights files with the `eventMacros.txt` name or `.event` extension.

To manually apply it to other files:

1. Open the file in VSCode
2. Click on the language mode selector (bottom-right corner)
3. Choose **`eventMacro`** from the list

---

## Example

```eventmacro
# This is a comment

automacro BuyLemon {
    CharCurrentWeight < 89%
    InMap ayothaya
    Zeny >= 10000
    macro_delay 0.1
    exclusive 1
    call {
        do move ayothaya 119 237
        pause 2
        do talknpc 121 240 r2 r0
        pause 2
        do cart add &inventory(Lemon)
    }
}
```

---

## Known Issues

If you find a bug or unexpected behavior, please report it here:  
👉 [Issue Tracker](https://github.com/alisonrag/vsce-eventmacro-language-support/issues)

---

## Contributing

Contributions are welcome!  
Feel free to fork the repo, open issues, or submit pull requests.

---

## License

This project is licensed under the [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html).
