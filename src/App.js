import React, { useState } from 'react';
import './App.css';

const COLORS = {
  U: 'w', D: 'y', F: 'g', B: 'b', L: 'o', R: 'r'
};

class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill(COLORS.U),
      D: Array(9).fill(COLORS.D),
      F: Array(9).fill(COLORS.F),
      B: Array(9).fill(COLORS.B),
      L: Array(9).fill(COLORS.L),
      R: Array(9).fill(COLORS.R),
    };
  }

  rotateFace(face) {
    const f = this.faces[face];
    this.faces[face] = [f[6], f[3], f[0], f[7], f[4], f[1], f[8], f[5], f[2]];
  }

  rotateFaceCounter(face) {
    const f = this.faces[face];
    this.faces[face] = [f[2], f[5], f[8], f[1], f[4], f[7], f[0], f[3], f[6]];
  }

  rotate(move) {
    const prime = move.endsWith("'");
    const face = move[0];
    if (prime) this[face + "Prime"]();
    else this[face]();
  }

  U() { this.rotateFace('U'); }
  UPrime() { this.U(); this.U(); this.U(); }
  D() { this.rotateFace('D'); }
  DPrime() { this.D(); this.D(); this.D(); }
  F() { this.rotateFace('F'); }
  FPrime() { this.F(); this.F(); this.F(); }
  B() { this.rotateFace('B'); }
  BPrime() { this.B(); this.B(); this.B(); }
  L() { this.rotateFace('L'); }
  LPrime() { this.L(); this.L(); this.L(); }
  R() { this.rotateFace('R'); }
  RPrime() { this.R(); this.R(); this.R(); }

  scramble(steps = 10) {
    const moves = ['U', "U'", 'D', "D'", 'F', "F'", 'B', "B'", 'L', "L'", 'R', "R'"];
    let scramble = [];
    for (let i = 0; i < steps; i++) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      this.rotate(move);
      scramble.push(move);
    }
    return scramble;
  }

  getFaces() {
    return this.faces;
  }
}

const Face = ({ face }) => (
  <div className="d-flex flex-wrap cube-face">
    {face.map((color, i) => (
      <div key={i} className={`cube-cell ${color}`}></div>
    ))}
  </div>
);

function App() {
  const [cube, setCube] = useState(new Cube());
  const [faces, setFaces] = useState(cube.getFaces());
  const [moves, setMoves] = useState([]);

  const handleScramble = () => {
    const newCube = new Cube();
    const scrambleMoves = newCube.scramble();
    setCube(newCube);
    setFaces(newCube.getFaces());
    setMoves(scrambleMoves);
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Rubik's Cube Simulator</h1>
      <div className="cube-grid mb-4">
        {Object.keys(faces).map(face => (
          <div key={face}>
            <h5>{face}</h5>
            <Face face={faces[face]} />
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleScramble}>Scramble Cube</button>
      <div className="mt-3">
        <strong>Scramble Moves:</strong> {moves.join(" ")}
      </div>
    </div>
  );
}

export default App;