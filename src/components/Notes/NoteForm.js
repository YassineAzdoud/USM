import React from "react";

const NoteForm = (props) => {
    const {togglePopup, formTitle,createdDate, userName, registrationNumber, firstName, lastName, status,firstChanged, lastChanged, statusChanged, dateChanged, userChanged,RBChanged, submitClicked, submitText} = props;

    return (
      <form className="popup">
        <div className="popup_inner">
        <button onClick={togglePopup} className="close" >X</button> 
        <h2>{formTitle}</h2>
        <div className="grid">
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="userName"
            value={userName}
            onChange={userChanged}
            
          />
<input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="firstName"
            value={firstName}
            onChange={firstChanged}
          
          />
          <input
            type="text"
            name="title"
            className="form-input mb-30"
            placeholder="lastName"
            value={lastName}
            onChange={lastChanged}
       
          />
            <select 
                name="status"  required onChange={statusChanged}>
             <option value="En validation">En validation</option>
                <option value="Validé">Validé</option>
                <option value="Rejeté">Rejeté</option>
                
                </select>
        

<input
                type="date"
                placeholder="Created Date"
                name="createdDate"
                required
                value={createdDate}
                onChange={dateChanged}
            />
                      
            <input
                type="number"
                placeholder="Registration Number"
                name="registrationNumber"
                value={registrationNumber}
                required
                onChange={RBChanged}
            />

  

          <button className="add-button" onClick={submitClicked}>
            {submitText}
          </button>
        </div>
      </div>
      </form>
    )
}

export default NoteForm