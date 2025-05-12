import './style.css'

export default function Dashboard() {
  return (
    <div>
      <div className='dashboard-container'>
        <div className='bill-items'>
          <table
            cellPadding='1'
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                <th>No.</th>
                <th>Items</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
              <tr style={{ height: '10px' }}></tr>
              <tr>
                <td colSpan='5'>
                  <hr style={{ border: '0.5px solid #00000051' }} />
                </td>
              </tr>
            </thead>

            <tbody>
              <tr style={{ height: '10px' }}></tr>

              <tr style={{ height: '30px' }}>
                <td className='tds'>1 </td>
                <td className='tds'>item.nam</td>
                <td className='tds'>
                  {/* {item.price % 1 === 0 ? item.price : item.price.toFixed(2)} */}
                  100
                </td>
                <td className='tds'>item.count</td>
                <td className='tds'>
                  200
                  {/* {(item.price * item.count) % 1 === 0
                      ? item.price * item.count
                      : (item.price * item.count).toFixed(2)} */}
                </td>
              </tr>

              <tr style={{ height: '10px' }}></tr>

              <tr style={{ height: '10px' }}>
                <td colSpan='5'>
                  <hr style={{ border: '0.5px solid #00000051' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
