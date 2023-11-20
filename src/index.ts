import {
    FileMode,
    FlexLayout, QAction,
    QFileDialog, QGroupBox, QIcon,
    QMainWindow,
    QMenu, QMenuBar,
    QPushButton, QTableView, QTableWidget,
    QTextBrowser, QTextEdit,
    QWidget
} from '@nodegui/nodegui';
import {watchAFile} from "./fileWatch";


const win = new QMainWindow();
win.setWindowTitle("File Watcher");
win.setWindowIcon(new QIcon("./assets/file.png"));
win.setGeometry(100, 100, 1000, 1000);

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");

const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);
const table = new QTableWidget(1, 1);
table.setColumnWidth(0, 1000);
table.setObjectName("table");
table.setInlineStyle("flex: 1");

// Create a menu bar
const menuBar = new QMenuBar();
win.setMenuBar(menuBar);

const button = new QPushButton();
button.setText('Open');

const findNextButton = new QPushButton();
findNextButton.setText('Find Next');

centralWidget.layout()?.addWidget(button);
centralWidget.layout()?.addWidget(findNextButton);

const searchBar = new QTextEdit()
searchBar.setObjectName('searchbar')
searchBar.setPlaceholderText('Search');
// rootLayout.addWidget(button);
// rootLayout.addWidget(findNextButton);
rootLayout.addWidget(searchBar);
rootLayout.addWidget(table);


win.setCentralWidget(centralWidget);

win.setStyleSheet(
    `
    #myroot {
      height: '100%';
      align-items: 'start';
      justify-content: 'start';
    }
    #table {
      background-color: 'white';
    }
    #searchbar {
      background-color: 'white';
      height: '40px';
      margin-left: '5px';
      margin-right: '5px';
      margin-top: '5px';
      margin-bottom: '5px';
      border-radius: '50%';
    }
    QPushButton {
     width: '80px';
     margin-left: '5px';
        }
  `
);
win.show();

(global as any).win = win;

let closeFile: Function | undefined;

button.addEventListener('clicked', () => {
    const fileDialog = new QFileDialog()

    fileDialog.addEventListener('fileSelected', (file) => {
        if (closeFile) {
            closeFile()
        }
        closeFile = watchAFile(file, table)
    })

    fileDialog.setFileMode(FileMode.AnyFile)
    fileDialog.exec()
});

findNextButton.addEventListener('pressed', () => {
    const text = searchBar.toPlainText()
    table.keyboardSearch(text)
})

searchBar.addEventListener("textChanged", () => {
    const text = searchBar.toPlainText();
    table.keyboardSearch(text)
    // findAllOccurrences(table.keyboardSearch(), text).forEach((match) => {
    //     console.log(match);
    //     // // find the index of the match in the textBrowser
    //     // const index = textBrowser.toPlainText().indexOf(match);
    //     // // find the line number of the match
    //     // const lineNumber = textBrowser.toPlainText().substr(0, index).split('\n').length;
    //     // // find the column number of the match
    //     // const columnNumber = textBrowser.toPlainText().substr(0, index).split('\n').pop().length;
    //     // // select the text
    //     // textBrowser.setHorizontalScrollBar(lineNumber, columnNumber);
    //
    // })
})

function findAllOccurrences(sentence: string, searchString: string) {
    const regex = new RegExp('.*?' + searchString + '.*', 'g');
    const matches = sentence.match(regex);

    return matches || [];
}


