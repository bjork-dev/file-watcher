import Tail from "tail";
import {QLabel, QTextBrowser} from "@nodegui/nodegui";

const options = {separator: /[\r]{0,1}\n/, fromBeginning: true, fsWatchOptions: {}, follow: true, logger: console};

export function watchAFile(filePath: string, label: QTextBrowser): Function {
    const fileWatch = new Tail.Tail(filePath, options);

    fileWatch.on("line", function (data) {
        label.append(data);
    });

    fileWatch.on("error", function (error) {
        console.error('ERROR: ', error);
    });

    function unWatch() {
        fileWatch.unwatch();
        label.clear();
    }

    return unWatch;
}




