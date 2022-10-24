import React from 'react';
import QRCode from 'qrcode';
import '../css/app.css';

// features:
// 1: render text
// 2: render by url
// 3: render by 
// 4: QR Code Colors
// 4: save the QR code
// 5: generate button

function App() {
  const [src, setSrc] = React.useState("")
  const [filter, setFilter] = React.useState("URL")
  const [data, setData] = React.useState("undefined")

  const [options, setOptions] = React.useState({
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
      dark:"#000000",
      light:"#FFFFFF"
    },
    width: 100,
  })
  
  function generateQRCode(e) {
    e.preventDefault();
    QRCode.toDataURL(data, options, function (err, url) { 
      if (err) throw err
      setSrc(url)
    })
  }

  function saveQRCode() {
    var FileSaver = require('file-saver');
    FileSaver.saveAs(src, "image.jpg");
  }

  return (
    <div className="App">
      <div className='navBar'>
        <div onClick={() => setFilter('URL')}>
          {filter==='URL'?<div style={{color:'red'}}>URL + </div>:<div>URL + </div>}
        </div>
        <div onClick={() => setFilter('Text')}>
          {filter==='Text'?<div style={{color:'red'}}>TEXT + </div>:<div>TEXT + </div>}
        </div>
      </div>

      <form className='user_input_container' onSubmit={generateQRCode}>
        <div className='user_input_title'>
          QR Code Generator
        </div>
        <div className='user_input_field'>
          <div className='user_input_individual'>
            <label>{filter}: </label>
            <div>
              {filter==='URL'?
                <input 
                  type="url"
                  className="data_input"
                  onChange={(e) => setData(e.target.value)}
                  placeholder='Enter a URL'
                  required
                />
                :
                <input
                  type="text"
                  className="data_input"
                  onChange={(e) => setData(e.target.value)}
                  placeholder='Enter a Text Message'
                  required
                />
              }
            </div>
          </div>

          <div className='user_input_individual'>
            <label htmlFor='size-select'>QR Code Size: </label>
            <div>
              <select
                id="size-select"
                className="data_input"
                onChange={(e)=> setOptions((prevState) => ({
                  ...prevState,
                  width: e.target.value,
                }))}
              >
                <option defaultValue value="100">100x100</option>
                <option value="200">200x200</option>
                <option value="300">300x300</option>
                <option value="400">400x400</option>
                <option value="500">500x500</option>
                <option value="600">600x600</option>
                <option value="700">700x700</option>
              </select>
            </div>
          </div>

          <div className='user_input_individual'>
            <label>QR Code Black Module: </label>
            <input
              type="color"
              id="darkModulePicker"
              value={options.color.dark}
              onChange={(e)=> setOptions((prevState) => ({
                ...prevState,
                color: {
                  dark: e.target.value,
                  light: prevState.color.light
                },
              }))}
            />
          </div>
          <div className='user_input_individual'>
            <label>QR Code White Module: </label>
            <input
              type="color"
              id="lightModulePicker"
              value={options.color.light}
              onChange={(e)=> setOptions((prevState) => ({
                ...prevState,
                color: {
                  dark: prevState.color.dark,
                  light: e.target.value,
                },
              }))}
            />
          </div>
        </div>

        <button type="submit" className='generate_button'>
          Generate
        </button>

        {src===""?
          null:
          <div className='display_qr_code'>
            <img src={src} alt="qrcode"/>
            <button className='generate_button' onClick={saveQRCode}>
              Save
            </button>
          </div>
        }
      </form>
    </div>
  );
}

export default App;
