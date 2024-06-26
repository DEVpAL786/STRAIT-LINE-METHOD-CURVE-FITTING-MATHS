function addColumn() {
    
    let table = document.getElementById('dataTable');

    
    let cellX = document.createElement('td');
    let inputX = document.createElement('input');
    inputX.type = 'number';
    inputX.oninput = syncValues;
    cellX.appendChild(inputX);
    table.rows[0].appendChild(cellX);

   
    let cellY = document.createElement('td');
    let inputY = document.createElement('input');
    inputY.type = 'number';
    inputY.oninput = syncValues;
    cellY.appendChild(inputY);
    table.rows[1].appendChild(cellY);

   
    syncValueTable();
}

function addRow() {
    var table = document.getElementById('value-table');
    var newRow = table.insertRow(-1); 

 
    var numberOfCells = 4;

    for (var i = 0; i < numberOfCells; i++) {
        var newCell = newRow.insertCell(i); 
        var input = document.createElement('input'); 
        input.type = 'number'; 
        input.oninput = syncValues; 
        newCell.appendChild(input); 
    }

  
    syncValueTable();
}

function syncValues() {
    const inputX = document.getElementById('inputX');
    const inputY = document.getElementById('inputY');

    const xValue = parseFloat(inputX.value);
    const yValue = parseFloat(inputY.value);

    const valueTableBody = document.getElementById('value-table-body');

 
    let lastRow = valueTableBody.lastElementChild;

    if (!lastRow) {
      
        lastRow = document.createElement('tr');
        valueTableBody.appendChild(lastRow);
    }

    
    let cells = lastRow.cells;

    
    while (cells.length > 0) {
        cells[0].parentNode.removeChild(cells[0]);
    }

  
    const x2Value = isNaN(xValue) ? '' : (xValue ** 2).toFixed(2);
    const xyValue = isNaN(xValue) || isNaN(yValue) ? '' : (xValue * yValue).toFixed(2);

    appendCell(lastRow, isNaN(xValue) ? '' : xValue);
    appendCell(lastRow, isNaN(yValue) ? '' : yValue);
    appendCell(lastRow, x2Value);
    appendCell(lastRow, xyValue);

    
    syncValueTable();
}

function appendCell(row, value) {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'number';
    input.value = value;
    input.oninput = syncValues;
    cell.appendChild(input);
    row.appendChild(cell);
}

function syncValueTable() {
    const valueTable = document.getElementById('value-table');
    const dataRows = document.getElementById('dataTable').rows;

    
    let numRows = dataRows[0].cells.length - 1;
    while (valueTable.rows.length > numRows + 1) {
        valueTable.deleteRow(-1);
    }
    while (valueTable.rows.length < numRows + 1) {
        valueTable.insertRow(-1);
    }

    
    for (let i = 1; i <= numRows; i++) {
        let valueTableRow = valueTable.rows[i]; // 
        let inputs = valueTableRow.cells;

        
        if (inputs.length >= 4) {
            let inputX = dataRows[0].cells[i].querySelector('input').value;
            let inputY = dataRows[1].cells[i].querySelector('input').value;

            inputs[0].querySelector('input').value = inputX;
            inputs[1].querySelector('input').value = inputY;
            inputs[2].querySelector('input').value = isNaN(inputX) ? '' : (inputX ** 2).toFixed(2);
            inputs[3].querySelector('input').value = isNaN(inputX) || isNaN(inputY) ? '' : (inputX * inputY).toFixed(2);
        }
    }
}

function calculateColumnSums() {
    const valueTableBody = document.getElementById('value-table-body').rows;
    const numCols = valueTableBody[0].cells.length;

    let valueTableFooter = document.getElementById('value-table-footer');
    valueTableFooter.innerHTML = '';

    
    let sums = Array.from({ length: numCols }, () => 0);

    
    for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < valueTableBody.length; j++) {
            let value = parseFloat(valueTableBody[j].cells[i].querySelector('input').value);
            if (!isNaN(value)) {
                sums[i] += value;
            }
        }
    }

    
    let footerRow = valueTableFooter.insertRow(-1);
    for (let i = 0; i < numCols; i++) {
        let cell = footerRow.insertCell(i);
        cell.textContent = sums[i].toFixed(2);
    }

    let sigmax = sums[0];
    let sigmay = sums[1];
    let sigmaxsquare = sums[2];
    let sigmaxy = sums[3];
    let eq1 = document.querySelector("#in1");
    eq1.innerHTML = sigmay+"="+valueTableBody.length+"a"+"+"+"b"+sigmax;
    let eq2 = document.querySelector("#in2");
    eq2.innerHTML = sigmaxy+"="+"a"+sigmax+"+"+"b"+sigmaxsquare;

    const a1 = valueTableBody.length;
    const b1 = sigmax;
    const c1 = sigmay;
    const a2 = sigmax;
    const b2 = sigmaxsquare;
    const c2 = sigmaxy;

    
    const det = a1 * b2 - a2 * b1;

    
    if (det === 0) {
        document.getElementById('result').innerText = 'The system has no unique solution (determinant is zero).';
    } else {
        
        const a = (c1 * b2 - c2 * b1) / det;
        const b = (a1 * c2 - a2 * c1) / det;

       
        let resultt = document.querySelector("#result");
        resultt.innerHTML = "a = "+ a +"    and    "+"b = " + b;

        let final = document.querySelector("#finalresult");
        final.innerHTML = "y"+"="+a+"+"+b+"x";
    }
    

}