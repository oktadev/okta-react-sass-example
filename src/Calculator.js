import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: ['='],
      display: '0'
    }
  }

  numberPressed(val) {
    const s = this.state;
    if (typeof s.stack[s.stack.length - 1] !== 'number') {
      s.display = val;
      s.stack.push(parseInt(s.display, 10));
    } else {
      s.display += val;
      s.stack[s.stack.length - 1] = parseInt(s.display, 10);
    }
    this.setState(s);
  }

  operatorPressed(val) {
    const s = this.state;
    const precedenceMap = {'+': 0, '-': 0, '*': 1, '/': 1};
    this.ensureNumber(s);
    const precedence = precedenceMap[val];
    let reduce = true;
    while (reduce) {
      let i = s.stack.length - 1;
      let lastPrecedence = 100;

      while (i >= 0) {
        if (typeof s.stack[i] === 'string') {
          lastPrecedence = precedenceMap[s.stack[i]];
          break;
        }
        i--;
      }
      if (precedence <= lastPrecedence) {
        reduce = this.reduceLast(s);
      } else {
        reduce = false;
      }
    }

    s.stack.push(val);
    this.setState(s);
  }

  equalPressed() {
    const s = this.state;
    this.ensureNumber(s);
    while (this.reduceLast(s)) {}
    s.stack.pop();
    this.setState(s);
  }

  percentPressed() {
    const s = this.state;
    this.ensureNumber(s);
    while (this.reduceLast(s)) {}
    const result = s.stack.pop() / 100;
    s.display = result.toString(10);
    this.setState(s);
  }

  acPressed() {
    const s = this.state;
    s.stack = ['='];
    s.display = '0';
    this.setState(s);
  }

  cePressed() {
    const s = this.state;
    if (typeof s.stack[s.stack.length - 1] === 'number') { s.stack.pop(); }
    s.display = '0';
    this.setState(s);
  }

  ensureNumber(s) {
    if (typeof s.stack[s.stack.length - 1] === 'string') {
      s.stack.push(parseInt(s.display, 10));
    }
  }

  reduceLast(s) {
    if (s.stack.length < 4) { return false; }
    const num2 = s.stack.pop();
    const op = s.stack.pop();
    const num1 = s.stack.pop();
    let result = num1;
    switch (op) {
      case '+': result = num1 + num2;
        break;
      case '-': result = num1 - num2;
        break;
      case '*': result = num1 * num2;
        break;
      case '/': result = num1 / num2;
        break;
      default:
    }
    s.stack.push(result);
    s.display = result.toString(10);
    return true;
  }

  render() {
    return (
      <div className="calculator-container">
        <div className="calculator">
          <p className="display">{this.state.display}</p>
          <div className="calculator-buttons">
            <button className="reset-button" onClick={this.acPressed.bind(this)}>AC</button>
            <button className="reset-button" onClick={this.cePressed.bind(this)}>CE</button>
            <button className="operator-button" onClick={this.percentPressed.bind(this)}>%</button>
            <button className="operator-button" onClick={this.operatorPressed.bind(this, '/')}>÷</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '7')}>7</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '8')}>8</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '9')}>9</button>
            <button className="operator-button" onClick={this.operatorPressed.bind(this, '*')}>x</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '4')}>4</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '5')}>5</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '6')}>6</button>
            <button className="operator-button" onClick={this.operatorPressed.bind(this, '-')}>-</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '1')}>1</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '2')}>2</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '3')}>3</button>
            <button className="operator-button" onClick={this.operatorPressed.bind(this, '+')}>+</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '0')}>0</button>
            <button className="number-button" onClick={this.numberPressed.bind(this, '.')}>.</button>
            <button className="equal-button" onClick={this.equalPressed.bind(this)}>=</button>
          </div>
        </div>
        <div className="calculator-stack">
          <h4>Stack</h4>
          <table>
            <tbody>
            {this.state.stack.map(el => (<tr><td>{el}</td></tr>))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calculator;
