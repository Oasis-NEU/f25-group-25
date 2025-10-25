function DebtTable() {
    return <div className="flex items-center w-full">
    <table className='bg-white table-auto rounded-md outline-2 mx-auto [&_td]:text-center [&_td]:py-2 [&_th]:py-2 w-3/4'>
        <thead className="bg-slate-100 border-b-2 upper font">
            <tr>
                <th>Person</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody className="bg-white">
            <tr>
                <td>Richard Feng</td>
                <td>$19.12</td>
                <td>10/5/2025</td>
            </tr>
            <tr>
                <td>Martin Villa</td>
                <td>$32.44</td>
                <td>10/6/2025</td>
            </tr>
        </tbody>
    </table>
    </div>
}

export default DebtTable