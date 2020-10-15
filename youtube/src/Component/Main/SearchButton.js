import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom';

export default function Main2(props) {
    let searchInput  = props;
    let history = useHistory();

    const pushHistory = () => {
        history.push({pathname :`/${searchInput}`})
    }

    
    return (
        <div>
            <button onClick={() => {
                props.click();
                pushHistory();
            }
            } className='faSearch' >                   
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    )
}
