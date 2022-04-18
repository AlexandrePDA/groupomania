import React from 'react';
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MdAddAPhoto } from 'react-icons/md';
import { BsFillChatTextFill } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { BsTrashFill } from 'react-icons/bs';

const schema = yup.object({
    bio: yup
      .string()
      .min(1, "Veuillez remplir le champ")
      .max(200, "Pas plus de 200 caractères")
  });

const EditMyProfile = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const submitPrevent = (e) => {
        e.preventdefault()
    }

    // delete profile
    const handleDelete = async () => {
        const res = await axios.delete("http://localhost:3000/api/users/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }); 
        localStorage.clear();
        console.log(res);
    }

    // modif picture + bio => NE MARCHE PAS 401 Unauthorized MALGRE LE TOKEN
    const handleModif =  async (data) => {
        console.log(data);
        const res = await axios.put("http://localhost:3000/api/profiles/71", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });  
        console.log(res);
    };


    return (
        <div className="container-edit">
            <NavLink to="/profile" className="back-profile">
            <BiArrowBack />
          </NavLink>
            <h1>Modifier le profil</h1>
            <form action="submit" onSubmit={handleSubmit(handleModif)}>
                <label htmlFor="image">Modifier la photo <MdAddAPhoto/> </label>
                <input type="file" id="image" name="image"
       accept="image/png, image/jpeg, image/jpg"/>

                <label htmlFor="bio">Modifier la bio <BsFillChatTextFill/> </label>
                <textarea {...register("bio")} name="bio" id="bio" maxLength="200" cols="30" rows="10"></textarea>
                {errors.bio && <div className="error-bio">{errors.bio.message}</div>}


                <input type="submit" id="button" value="Modifier" onClick={submitPrevent}/>
            </form>
                <button className="delete" onClick={handleDelete}><BsTrashFill/> <p>Supprimer mon profil</p> </button>
        </div>
    );
};

export default EditMyProfile;