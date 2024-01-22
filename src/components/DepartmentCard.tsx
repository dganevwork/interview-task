import React from 'react';

type DepartmentCard = {
  id: number;
  name: string;
  lessThan29: number;
  lessThan39: number;
  older: number;
  total: number;
}

interface DepartmentCardProps {
  dCard: DepartmentCard;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ( {dCard} ) => {
  return (
      <div key={dCard.id} className="card">
        <div className="Card-title row">
          <div>
            <p className="h3 Card-name">{dCard.name}</p>
          </div>
          <div>
            <p className="h3">29歳以下 <b>{((dCard.lessThan29/dCard.total)*100).toFixed(2)}</b>%</p>
          </div>
        </div>
        <br/>
        <div className="Card-content">
          <div className="row">
            <div className="Member-label">メンバー構成</div>
          </div>
          
          <div className="row">
            <div>29歳以下</div>
            <div><b>{dCard.lessThan29}</b> 人</div>
          </div>
          
          <div className="row">
            <div>39歳以下</div>
            <div><b>{dCard.lessThan39}</b> 人</div>
          </div>
          
          <div className="row">
            <div>40歳以上</div>
            <div><b>{dCard.older}</b> 人</div>
          </div>
          
          <div className="Card-foot row">
            <div>合計</div>
            <div><b>{dCard.total}</b> 人</div>
          </div>
        </div>
      </div>
  );
};

export default DepartmentCard;