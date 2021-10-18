import React, { useState} from 'react';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm({handleSubmit, handleInput}) {
  return (
    <form style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        onChange={handleInput}
        placeholder='Coder'
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        onChange={handleInput}
        placeholder='Byte'
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        onChange={handleInput}
        placeholder='8885559999'
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
        onClick={handleSubmit}
        // only when clicking on submit it will trigger handlesubmit which is add to the below list
      />
    </form>
  )
}

function InformationTable({list}) {
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
       
        {list.map((item, index) => {
          return (
            <tr>
              <th style={style.tableCell} key={index}>{item.userFirstname}</th>  
              <th style={style.tableCell} key={index}>{item.userLastname}</th>  
              <th style={style.tableCell} key={index}>{item.userPhone}</th>
            </tr>
        )})}
      </thead> 
    </table>
  );
}

function App() {
  const [newUser, setNewUser] = useState([])
  const [list, setList] = useState([])

   const handleInput = (e) => {
    e.preventDefault();
    setNewUser({...newUser, [e.target.name]:e.target.value});
  }
  // handleInput is for onChange, to put all the input values to it accordingly names

  const handleSubmit = (e) => {
    e.preventDefault();
    setList(list.concat(newUser).sort((a,b) => (a.userLastname > b.userLastname) ? 1 : -1));
    // this is to add newUser to the list, I can't  use push here, concat is good
    // then sort by last name
    document.querySelector('.userPhone').value = ''
    document.querySelector('.userLastname').value = ''
    document.querySelector('.userFirstname').value = ''
    // these 3 code is to set the input box to be empty, because I don't have individual state for each input, so I used document.querySelector here
  }

   return (
    <section>
      <PhoneBookForm 
        handleSubmit={handleSubmit}
        handleInput={handleInput}
       />
      <InformationTable 
        list={list}/>
    </section>
  );
}

export default App;
