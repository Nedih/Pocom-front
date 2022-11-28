import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import "/node_modules/flag-icons/css/flag-icons.min.css";

const lngs = {
    en: { nativeName: 'English', flag: "" },
    ua: { nativeName: 'Українська', flag: "" }
  };

function LanguageButton() {
    const { i18n } = useTranslation();

    return (
        <div className='lang'>
            
            <div class="dropdown">
                <button class="dropbtn">Dropdown
                <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    {Object.keys(lngs).map((lng) => (
                        <a key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit"className="dropdown-item" 
                            onClick={() => i18n.changeLanguage(lng)}>
                            {lngs[lng].nativeName}
                        </a>
                    ))}
                </div>
            </div>
                            {/*Object.keys(lngs).map((lng) => (
                            <li>
                                <a key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit"className="dropdown-item" 
                                    onClick={() => i18n.changeLanguage(lng)}>
                                    {lngs[lng].nativeName}
                                </a>
                            </li>
                            ))*/}
                        
            
            <span className="fi fi-gr"></span> <span className="fi fi-gr fis"></span>


        </div>
    );
  }
  
  export default LanguageButton;