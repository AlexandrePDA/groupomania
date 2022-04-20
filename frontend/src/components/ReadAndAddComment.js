import React from 'react';
import CardComm from './CardComm';

const ReadAndAddComment = (item) => {

   

    const commentaires = item.props.props.props.commentaire;

    const commentaireMap = commentaires.map((comm) => (comm.comment) )
    console.log(commentaireMap);

    return (
        <div className="showComment">
        <ul>
          <li>{item.props.props.props.commentaire.length > 0? (
              (commentaires.map((comm) => (<CardComm key={comm.id} props={comm}/>) ))
          ) : ("Aucun commentaire")}</li>
          <input type="text" placeholder="Réagissez..."/>
        </ul>
      </div> 
    );
};

export default ReadAndAddComment;