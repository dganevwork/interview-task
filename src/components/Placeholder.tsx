import React from 'react';

import {ReactComponent as HappyIcon} from '../icons/Happy.svg';
import {ReactComponent as SadIcon} from '../icons/Sad.svg';

interface PlaceholderProps {
  content: "ERROR" | "LOADING" | "DEFAULT";
}



const Placeholder: React.FC<PlaceholderProps> = ({ content }) => {

  if(content === "ERROR"){
    return(
      <div className="Placeholder">
        <SadIcon className="big-icon sad"/>
        <b>情報の取得に失敗しました。</b>
        <span>しばらく時間をあけて、再度「情報を取得」ボタンを押してください。</span>
      </div>
    );
  }

  return(
    <div className="Placeholder">
      <HappyIcon className="big-icon happy"/>
      <b>
        最初に、情報を取得しましょう
      </b>
      <span>「情報を取得ボタン」を、押してください。</span>
    </div>
  );
  
};

export default Placeholder;