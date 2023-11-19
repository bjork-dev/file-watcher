import Tail from "tail";
import {QColor, QLabel, QTableView, QTableWidget, QTableWidgetItem, QTextBrowser, QVariant} from "@nodegui/nodegui";

const options = {separator: /[\r]{0,1}\n/, fromBeginning: true, fsWatchOptions: {}, follow: true, logger: console};

export function watchAFile(filePath: string, table: QTableWidget): Function {
    const fileWatch = new Tail.Tail(filePath, options);
    let i = 1;
    fileWatch.on("line", function (data) {
        data = data.replace(/^\s+/, '');
        table.insertRow(i)
        const cell = new QTableWidgetItem();
        cell.setText(data);
        table.setItem(i, 0, cell);
        i++;
    });

    fileWatch.on("error", function (error) {
        console.error('ERROR: ', error);
    });

    function unWatch() {
        fileWatch.unwatch();
        table.clear();
    }

    return unWatch;
}




