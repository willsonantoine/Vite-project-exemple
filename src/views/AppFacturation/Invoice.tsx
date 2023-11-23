import '../../assets/styles/Invoice.css'

const Invoice = (facture: FactureInterface) => {
    const {client_name, amount, currency, number, date, details} = facture;
    console.log(facture)
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html lang="fr"><head><title>Facture</title></head><body>');
            printWindow.document.write('<style>');
            printWindow.document.write('.designation { white-space: nowrap; }');
            printWindow.document.write('</style>');
            printWindow.document.write('<div class="invoice">');
            printWindow.document.write('<div class="header">');
            printWindow.document.write('<h4>Facture #' + number + '</h4>');
            printWindow.document.write('<h3>MUKADJA EXPO</h3>');
            printWindow.document.write('<p>Date: ' + date + '</p>');
            printWindow.document.write('</div>');
            printWindow.document.write('<div class="client">');
            printWindow.document.write('<h5>Client: ' + client_name + '</h5>');
            printWindow.document.write('</div>');
            printWindow.document.write('<div class="details">');
            printWindow.document.write('========================');
            printWindow.document.write('<table>');
            printWindow.document.write('<thead>');
            printWindow.document.write('<tr>');
            printWindow.document.write('<th>Designation</th>');
            printWindow.document.write('<th>P.U</th>');
            printWindow.document.write('<th>Qte</th>');
            printWindow.document.write('<th>P.T</th>');
            printWindow.document.write('</tr>');
            printWindow.document.write('</thead>');
            printWindow.document.write('<tbody>');
            {
                details ? details.forEach((item) => {
                    printWindow.document.write('<tr>');
                    printWindow.document.write('<td class="designation">' + item.name + '</td>');
                    printWindow.document.write('<td>' + item.prix + '</td>');
                    printWindow.document.write('<td>' + item.qte + '</td>');
                    printWindow.document.write('<td>' + item.prix_total + '</td>');
                    printWindow.document.write('</tr>');
                }) : ``;
            }
            printWindow.document.write('==========================');
            printWindow.document.write('</tbody>');
            printWindow.document.write('</table>');
            printWindow.document.write('</div>');
            printWindow.document.write('<div class="total">');
            printWindow.document.write('<h3>Total: ' + amount + ' ' + currency + '</h3>');
            printWindow.document.write('</div>');
            printWindow.document.write('</div>');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }
    };


    return (
        <div className="invoice">
            <div id='myprint'>
                <div className="header">
                    <h4>Facture #{number}</h4>
                    <h3>MUKADJA EXPO</h3>
                    <p>Date: {date}</p>
                </div>
                <div className="client">
                    <h5>Client: {client_name}</h5>
                </div>
                <div className="details">
                    <table>
                        <thead>
                        <tr>
                            <th>Designation</th>
                            <th>P.U</th>
                            <th>Qte</th>
                            <th>P.T</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details ? details.map((item: CardPanier, index: number) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.prix}</td>
                                <td>{item.qte}</td>
                                <td>{item.prix_total}</td>
                            </tr>
                        )) : ``}
                        </tbody>
                    </table>
                </div>
                <div className="total">
                    <h3>Total: {amount} {currency}</h3>
                </div>
            </div>

            <button className='button' onClick={handlePrint}>Imprimer</button>
        </div>
    );
};

export default Invoice;