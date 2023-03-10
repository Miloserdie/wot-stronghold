import './style.scss';
import React, {useState} from 'react';
import {ClanReserves} from "../../types";
import {bonusName, reservesName} from "../../utils/reservesVocabulary";
import ClanReservesInStockItem from "../ClanReservesInStockItem";
import sortDownIcon from '../../assets/images/reserveItem/sort-down.png';

type ClanReservesItemProps = {
    reservesItem: ClanReserves
};

const ClanReservesItem = ({reservesItem}: ClanReservesItemProps) => {
    const [isInStockActive, setIsInStockActive] = useState<boolean>(false);
    const setElementActive = isInStockActive ? 'active' : '';

    return (
        <li  className={'clan-reserves-item'}>
            <div onClick={() => setIsInStockActive((prevState) => !prevState)} className={'clan-reserves-item__top'}>
                <div className={'clan-reserves-item__left'}>
                    <h3 className={'clan-reserves-item__name'}>{reservesName(reservesItem.type)}</h3>
                    <p className={`clan-reserves-item__bonus-name`}>{bonusName(reservesItem.type)}</p>
                </div>
                <img className={`clan-reserves-item__img ${setElementActive}`} src={sortDownIcon} alt="sort-down"/>
            </div>
            <ul className={`clan-reserves-item__in-stock ${setElementActive}`}>
                {reservesItem.in_stock.map((inStockItem, index) => {
                    return <ClanReservesInStockItem key={inStockItem.level + index} inStockItem={inStockItem} reserveType={reservesItem.type}/>
                })}
            </ul>
        </li>
    );
};

export default ClanReservesItem;