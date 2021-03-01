import {
    MarksSelectedEvent,
    Parameter,
    ParameterChangedEvent,
    ParameterDomainRestriction,
    Worksheet
} from '@tableau/extensions-api-types';

import { DataType } from '@tableau/extensions-api-types/ExternalContract/Namespaces/Tableau';
let socket = new WebSocket('ws://localhost:8080');
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

function sendToFinsemble(data: any) {

    socket.send(data)


    // // Listen for messages
    // socket.addEventListener('message', function (event) {
    //     console.log('Message from server ', event.data);
    // });


}

// Wrap everything in an anonymous function to avoid polluting the global namespace

async function main() {
    console.log('Initializing extension API');
    await tableau.extensions.initializeAsync();
    // Add an event listener for the selection changed event on this sheet.
    // Assigning the event to a variable just to make the example fit on the page here.
    const markSelection = tableau.TableauEventType.MarkSelectionChanged;
    //
    let prms = document.getElementById("result");

    tableau.extensions.dashboardContent.dashboard.worksheets.forEach(worksheet => {
        worksheet.addEventListener(markSelection, async function (selectionEvent: MarksSelectedEvent) {
            let a = await selectionEvent.worksheet.getSelectedMarksAsync();
            // getSelectedMarksAsync()
            let data = a.data[0]
            let res = data.columns.map(col => ({ [col.fieldName]: data.data[0][col.index].value }))
            prms.innerHTML = JSON.stringify(res)
            sendToFinsemble(JSON.stringify(res))

        });
    })

    tableau.extensions.dashboardContent.dashboard.worksheets.forEach(worksheet => {
        prms.append(worksheet.name);
    })
}

document.addEventListener("DOMContentLoaded", main)



