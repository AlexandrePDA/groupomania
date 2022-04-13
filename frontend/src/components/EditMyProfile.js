import React from 'react';
import { NavLink } from "react-router-dom";
import { MdAddAPhoto } from 'react-icons/md';
import { BsFillChatTextFill } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi'



const EditMyProfile = () => {

    const handleModif = (e) => {
        e.preventDefaul()
        
    }

    return (
        <div className="container-edit">
            <NavLink to="/profile" className="back-profile">
            <BiArrowBack />
          </NavLink>
            <h1>Modifier le profil</h1>
            <form action="submit" onSubmit={handleModif}>
                <label htmlFor="avatar">Modifier la photo <MdAddAPhoto/> </label>
                <input type="file" id="avatar" name="avatar"
       accept="image/png, image/jpeg, image/jpg"/>

                <label htmlFor="bio">Modifier la bio <BsFillChatTextFill/> </label>
                <textarea name="bio" id="bio" cols="30" rows="10"></textarea>

                <input type="submit" id="button" value="Modifier" />
            </form>
        </div>
    );
};

export default EditMyProfile;