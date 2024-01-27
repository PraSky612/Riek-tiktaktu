import { useEffect, useState } from 'react'
import './App.css'

function Kotak({ isi, onKotakClick }) {
  return (
    <button className='kotak' onClick={onKotakClick}>
      {isi}
    </button>
  )
}

function Papan({xLanjut, kotak, onPlay, move}) {

  function handleClick(i) {
    if (kotak[i] || kemenangan(kotak)) {
      return
    }
    const nextKotak = kotak.slice()

    nextKotak[i] = xLanjut ? 'X' : 'O'

    onPlay(nextKotak)

  }



  const menang = kemenangan(kotak);
  let status
  if (menang) {
    status = 'Menang ' + menang
  } else{
    status = (move >= 9) ? 'Seri!' : 'selanjutnya ' + (xLanjut ? 'X' : 'O')
  }


  return (
    <>
      <div className='status'>{status}</div>
      <div className="barisPapan">
        <Kotak isi={kotak[0]} onKotakClick={() => handleClick(0)} />
        <Kotak isi={kotak[1]} onKotakClick={() => handleClick(1)} />
        <Kotak isi={kotak[2]} onKotakClick={() => handleClick(2)} />
      </div>
      <div className="barisPapan">
        <Kotak isi={kotak[3]} onKotakClick={() => handleClick(3)} />
        <Kotak isi={kotak[4]} onKotakClick={() => handleClick(4)} />
        <Kotak isi={kotak[5]} onKotakClick={() => handleClick(5)} />
      </div>
      <div className="barisPapan">
        <Kotak isi={kotak[6]} onKotakClick={() => handleClick(6)} />
        <Kotak isi={kotak[7]} onKotakClick={() => handleClick(7)} />
        <Kotak isi={kotak[8]} onKotakClick={() => handleClick(8)} />
      </div>
    </>
  );
}
export default function Game() {
  // const [xLanjut, setXLanjut] = useState(true);
  const [history, setHistori] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentKotak = history[currentMove];
  let xLanjut = (currentMove % 2 === 0)

  useEffect(()=>{
    console.log("move : ", currentMove)
    console.log("giliran : ", xLanjut)
    console.log(currentKotak)
  },[xLanjut,currentMove,currentKotak])

  function handlePlay(nextKotak) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextKotak];
    setHistori(nextHistory)
    setCurrentMove(nextHistory.length - 1);
  }

  function kembaliKe(nextMove) {
    setCurrentMove(nextMove);
  }
  
  function undo() {
    if(currentMove == 0) return alert("Belum main");
    setCurrentMove(currentMove - 1);
  }

  const move = history.map((kotak, move) => {
    let description;
    if (move > 0) {
      description = 'Kembali ke #'+ move;
    } else {
      description = `Awal Permainan`;
    }

    return (
      <li key={move}>
        <button onClick={() => kembaliKe(move)}>{description}</button>
      </li>
    )
  });

  return (
    <>
      <div className="game">
        <div className='gamePapan'>
          <button className='undo' onClick={undo}>UNDO</button>
          <Papan xLanjut={xLanjut} kotak={currentKotak} onPlay={handlePlay} move={currentMove} />
        </div>
      </div>
      <div className='gameInfo'>
        <ol>{move}</ol>
      </div>
    </>
  )

}


function kemenangan(kotak) {
  const garis = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < garis.length; i++) {
    const [a, b, c] = garis[i];
    if (kotak[a] && kotak[a] === kotak[b] && kotak[a] === kotak[c]) {
      return kotak[a];
    }
  }
  return false;
}


function App() {
  return Papan()
}

