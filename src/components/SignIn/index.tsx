import './style.scss';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../../utils/checkAuth";
import {getClanIdReq, getClanInfoReq} from "../../api/worldOfTanksApi";

type userDataObj = {
    access_token: string | null,
    nickname: string | null,
    account_id: number | null,
    expires_at: number | null,
    clan_id: number
    clan_tag: string,
    clan_emblem: string
    clan_name: string
}

const SignIn = () => {
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const isUserAuth = checkAuth();

    const handleUserInfo = async () => {
        const userSearchParams = new URLSearchParams(document.URL);

        if (userSearchParams.get('status') !== 'ok') {
            return
        }

        const clanId = await getClanIdReq(userSearchParams.get('account_id') as string);

        if(!clanId) {
            return setError('У вас немає клану');
        }

        const clanData = await getClanInfoReq(clanId, Number(userSearchParams.get('account_id')));

        const userData: userDataObj = {
            access_token: userSearchParams.get('access_token'),
            account_id: Number(userSearchParams.get('account_id')),
            expires_at: Number(userSearchParams.get('expires_at')),
            nickname: userSearchParams.get('nickname'),
            clan_id: clanId,
            clan_tag: clanData.tag,
            clan_emblem: clanData.emblems.x32.portal,
            clan_name: clanData.name
        }

        localStorage.setItem('userData', JSON.stringify(userData));

        setError('');

        navigate('/account');
    }

    useEffect(() => {
        if(isUserAuth) {
           return navigate('/account');
        }

        void handleUserInfo()

    }, [document.URL])


    return (
        <section className={'sign-in'}>
            <p className={'sign-in__error'}>{error}</p>
            <div className={'sign-in__auth'}>
                <img className={'sign-in__icon'} src="https://img.icons8.com/fluency/240/null/world-of-tanks.png" alt="wot-icon"/>
                <h1 className={'sign-in__title'}>World of Tanks<br /> Stronghold</h1>
                <p className={'sign-in__description'}>Застосунок для моніторингу та активації резервів клану</p>
                <p className={'sign-in__description'}>Все що треба для початку роботи це</p>
                <a className={'sign-in__link'} href={'https://api.worldoftanks.eu/wot/auth/login/?application_id=347cc9362aafc608559e5892b8e8b98f&expires_at=1678396374&redirect_uri=http://localhost:3000/signIn'}>Авторизуватися</a>
            </div>
            <footer className={'sign-in__footer'}>
                <p>Для автентифікації в обліковому записі він повинен мати принаймні один бій та буди у клані у World of Tanks. Якщо вам не вдається авторизуватися, це погано.</p>
            </footer>
        </section>
    );
};

export default SignIn;