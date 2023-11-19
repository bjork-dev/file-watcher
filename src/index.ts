import {
    FileMode,
    FlexLayout,
    QFileDialog,
    QMainWindow,
    QMenu,
    QPushButton,
    QTextBrowser,
    QWidget
} from '@nodegui/nodegui';
import {watchAFile} from "./fileWatch";


const win = new QMainWindow();
win.setWindowTitle("File");

const centralWidget = new QWidget();
centralWidget.setObjectName("myroot");
const rootLayout = new FlexLayout();
centralWidget.setLayout(rootLayout);
const textBrowser = new QTextBrowser();
textBrowser.setObjectName("textBrowser");
textBrowser.setInlineStyle("flex: 1; width:'100%';");


const button = new QPushButton();
button.setInlineStyle("align-self: 'start'; width: '50px';");
button.setText('Open');


rootLayout.addWidget(button);
rootLayout.addWidget(textBrowser);


win.setCentralWidget(centralWidget);

win.setStyleSheet(
    `
    #myroot {
      height: '100%';
      align-items: 'start';
      justify-content: 'start';
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
            console.log('closing file')
            closeFile()
        }
        closeFile = watchAFile(file, textBrowser)
    })
    fileDialog.setFileMode(FileMode.AnyFile)
    fileDialog.exec()
})

