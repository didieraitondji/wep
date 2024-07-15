import React, { createContext, useState } from 'react';

const VisibilityContext = createContext();

const VisibilityProvider = ({ children }) => {
    const [visibilityState, setVisibilityState] = useState({
        wepVisible: false,
        fonctionalityVisible: false,
        faqVisible: false,
    });

    const setIsWepVisible = (isVisible) => {
        setVisibilityState((prevState) => ({
            ...prevState,
            wepVisible: isVisible,
        }));
    };

    const setFonctionalityVisible = (isVisible) => {
        setVisibilityState((prevState) => ({
            ...prevState,
            fonctionalityVisible: isVisible,
        }));
    };

    const setFaqVisible = (isVisible) => {
        setVisibilityState((prevState) => ({
            ...prevState,
            faqVisible: isVisible,
        }));
    };

    return (
        <VisibilityContext.Provider value={{ visibilityState, setIsWepVisible, setFonctionalityVisible, setFaqVisible }}>
            {children}
        </VisibilityContext.Provider>
    );
};

export { VisibilityContext, VisibilityProvider };
