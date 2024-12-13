import {useState , useCallback, useEffect, useRef} from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');


  //useRef hook

  const passwordRef = useRef(null);    //password reference



/*useCallBack(fn, [dependencies]): React hook that lets your cache a function 
definition between re-renders. AKA Memoization

*/
  const passwordGenerator =  useCallback(() =>{

    let pass = "";
    let str = "ABCDEFGHIJCLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str +="0123456789";
    if(charAllowed) str +="!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1);
      pass +=  str.charAt(char);

    }

    setPassword(pass);


  }, [length,numberAllowed,charAllowed]);

//You can directly make the entire thing with useEffect. No use of useCallBack

const copyPasswordToClipboard = useCallback(()=>{

  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,100);
  window.navigator.clipboard.writeText(password);

}, [password]);


  useEffect( () => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);


  return (
    <div className="main">
       <div className = "inside">
          <input
            type='text'
            value={password}
            className='inputstyle'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className=""
            onClick={copyPasswordToClipboard}
            
            >copy</button>

       </div>
       <div>
          <div className='nextDiv'>
            <div className="nextInnerDiv">

              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="rangeInp"
                onChange={(e) => {setLength(e.target.value)}}
              />
              <label>Length: {length}</label>

            </div>
            
            <div className="nextInnerDiv">

                  <input
                    type="checkbox"
                    defaultChecked={numberAllowed}
                    id="numberInput"
                    onChange={() => {
                      setNumberAllowed((prev) => !prev);
                    }}
                  />
                  <label htmlfFor="numberInput">Numbers</label>

            </div>
            <div className="nextInnerDiv">

                <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="numberInput"
                  onChange={() => {
                    setCharAllowed((prev) => !prev);
                  }}
                />
                <label htmlfFor="characterInput">Characters</label>

            </div>


          </div>
       </div>
    </div>
  );
}

export default App;
