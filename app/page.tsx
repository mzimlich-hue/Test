"use client";

import { useEffect, useState } from "react";

type Operation = "+" | "−" | "×" | "÷";
type RepeatOperation = { operation: Operation; operand: number };
type Key = {
  label: string;
  kind?: "utility" | "operator" | "equals";
  wide?: boolean;
  action: () => void;
};

function cleanNumber(value: number) {
  if (!Number.isFinite(value)) return "Error";
  if (Object.is(value, -0)) return "0";
  if (Math.abs(value) >= 1e12) return value.toExponential(6);
  return String(Number(value.toPrecision(12)));
}

function calculate(left: number, right: number, operation: Operation) {
  switch (operation) {
    case "+":
      return left + right;
    case "−":
      return left - right;
    case "×":
      return left * right;
    case "÷":
      return right === 0 ? Number.NaN : left / right;
  }
}

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<Operation | null>(null);
  const [replaceDisplay, setReplaceDisplay] = useState(false);
  const [repeatOperation, setRepeatOperation] = useState<RepeatOperation | null>(null);

  const enterDigit = (digit: string) => {
    setRepeatOperation(null);
    if (display === "Error" || replaceDisplay) {
      setDisplay(digit);
      setReplaceDisplay(false);
      return;
    }

    if (display.replace("-", "").replace(".", "").length >= 12) return;
    setDisplay(display === "0" ? digit : `${display}${digit}`);
  };

  const enterDecimal = () => {
    setRepeatOperation(null);
    if (display === "Error" || replaceDisplay) {
      setDisplay("0.");
      setReplaceDisplay(false);
      return;
    }
    if (!display.includes(".")) setDisplay(`${display}.`);
  };

  const chooseOperation = (operation: Operation) => {
    const currentValue = Number(display);
    if (display === "Error") {
      setDisplay("0");
      setStoredValue(0);
    } else if (pendingOperation && storedValue !== null && !replaceDisplay) {
      const result = calculate(storedValue, currentValue, pendingOperation);
      const nextDisplay = cleanNumber(result);
      setDisplay(nextDisplay);
      setStoredValue(nextDisplay === "Error" ? null : Number(nextDisplay));
    } else {
      setStoredValue(currentValue);
    }
    setPendingOperation(operation);
    setReplaceDisplay(true);
    setRepeatOperation(null);
  };

  const pressEquals = () => {
    if (display === "Error") return;

    if (pendingOperation && storedValue !== null) {
      const operand = Number(display);
      const result = cleanNumber(calculate(storedValue, operand, pendingOperation));
      setDisplay(result);
      setRepeatOperation({ operation: pendingOperation, operand });
      setStoredValue(null);
      setPendingOperation(null);
      setReplaceDisplay(true);
      return;
    }

    if (repeatOperation) {
      setDisplay(cleanNumber(calculate(Number(display), repeatOperation.operand, repeatOperation.operation)));
      setReplaceDisplay(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setStoredValue(null);
    setPendingOperation(null);
    setReplaceDisplay(false);
    setRepeatOperation(null);
  };

  const toggleSign = () => {
    if (display === "Error" || display === "0") return;
    setDisplay(display.startsWith("-") ? display.slice(1) : `-${display}`);
    setReplaceDisplay(false);
    setRepeatOperation(null);
  };

  const percent = () => {
    if (display === "Error") return;
    const currentValue = Number(display);
    const percentValue =
      storedValue !== null && (pendingOperation === "+" || pendingOperation === "−")
        ? (storedValue * currentValue) / 100
        : currentValue / 100;
    setDisplay(cleanNumber(percentValue));
    setReplaceDisplay(false);
    setRepeatOperation(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) {
        enterDigit(event.key);
      } else if (event.key === ".") {
        enterDecimal();
      } else if (event.key === "+") {
        chooseOperation("+");
      } else if (event.key === "-") {
        chooseOperation("−");
      } else if (event.key === "*") {
        chooseOperation("×");
      } else if (event.key === "/") {
        event.preventDefault();
        chooseOperation("÷");
      } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        pressEquals();
      } else if (event.key === "Escape" || event.key === "Delete") {
        clear();
      } else if (event.key === "Backspace") {
        if (display === "Error" || replaceDisplay || display.length <= 1) {
          setDisplay("0");
          setReplaceDisplay(false);
        } else {
          setDisplay(display.slice(0, -1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const keys: Key[] = [
    { label: "AC", kind: "utility", action: clear },
    { label: "+/−", kind: "utility", action: toggleSign },
    { label: "%", kind: "utility", action: percent },
    { label: "÷", kind: "operator", action: () => chooseOperation("÷") },
    { label: "7", action: () => enterDigit("7") },
    { label: "8", action: () => enterDigit("8") },
    { label: "9", action: () => enterDigit("9") },
    { label: "×", kind: "operator", action: () => chooseOperation("×") },
    { label: "4", action: () => enterDigit("4") },
    { label: "5", action: () => enterDigit("5") },
    { label: "6", action: () => enterDigit("6") },
    { label: "−", kind: "operator", action: () => chooseOperation("−") },
    { label: "1", action: () => enterDigit("1") },
    { label: "2", action: () => enterDigit("2") },
    { label: "3", action: () => enterDigit("3") },
    { label: "+", kind: "operator", action: () => chooseOperation("+") },
    { label: "0", wide: true, action: () => enterDigit("0") },
    { label: ".", action: enterDecimal },
    { label: "=", kind: "equals", action: pressEquals },
  ];

  return (
    <main className="calculator-page">
      <section className="calculator" aria-label="Pocket Calculator">
        <header className="calculator-header">
          <div className="brand-icon" aria-hidden="true">±</div>
          <div>
            <p className="eyebrow">Everyday tools</p>
            <h1>Pocket Calculator</h1>
          </div>
          <span className="mode-pill">Standard</span>
        </header>

        <div className="display-panel">
          <p className="display-caption" aria-hidden="true">
            {pendingOperation ? `${cleanNumber(storedValue ?? 0)} ${pendingOperation}` : "Ready when you are"}
          </p>
          <output className="calculator-display" aria-live="polite" aria-atomic="true">
            {display}
          </output>
        </div>

        <div className="keypad" aria-label="Calculator keypad">
          {keys.map((key) => (
            <button
              className={[
                "calculator-key",
                key.kind ? `key-${key.kind}` : "",
                key.wide ? "key-wide" : "",
                key.kind === "operator" && pendingOperation === key.label ? "key-selected" : "",
              ].filter(Boolean).join(" ")}
              type="button"
              key={key.label}
              aria-label={key.label === "+/−" ? "Change sign" : key.label}
              aria-pressed={key.kind === "operator" ? pendingOperation === key.label : undefined}
              onClick={key.action}
            >
              {key.label}
            </button>
          ))}
        </div>
        <p className="keyboard-hint">Tip: use your keyboard for numbers and operations</p>
      </section>
      <footer className="page-footer">A little clarity, one calculation at a time.</footer>
    </main>
  );
}
