import React, { useState, useEffect } from 'react';
import './signup.css';
import image1 from '../assets/b1.jpg';
import image2 from '../assets/bk2.jpg';
import axios from 'axios';

const languages = {
  en: {
    signUp: 'Sign Up',
    firstName: 'First Name', 
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone Number',
    password: 'Password',
    submit: 'Submit',
    gender: 'Gender',
    male: 'Male (H)',
    female: 'Female (F)',
    offers: 'Receive offers from our partners',
    newsletter: 'Receive our newsletter',
    disclaimer: 'You can unsubscribe at any time. Please find our contact information in the site terms of use.',
    fbLogin: 'Connect with Facebook',
    googleLogin: 'Connect with Google',
   
  },
  fr: {
    signUp: 'Inscription',
    firstName: 'Prénom',
    lastName: 'Nom de Famille', 
    email: 'Email',
    phone: 'Numéro de Téléphone',
    password: 'Mot de Passe',
    submit: 'S\'inscrire',
    gender: 'Sexe',
    male: 'Homme (H)',
    female: 'Femme (F)',
    offers: 'Recevoir les offres de nos partenaires',
    newsletter: 'Recevoir notre newsletter',
    disclaimer: 'Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela nos informations de contact dans les conditions d\'utilisation du site.',
    fbLogin: 'Se connecter avec Facebook',
    googleLogin: 'Se connecter avec Google',
   
  },
  ar: {
    signUp: 'إنشاء حساب',
    firstName: 'الاسم الأول',
    lastName: 'الكنية',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    password: 'كلمة المرور',
    submit: 'تسجيل',
    gender: 'الجنس',
    male: 'ذكر (H)',
    female: 'أنثى (F)',
    offers: 'تلقّي عروض من شركائنا',
    newsletter: 'تلقّي نشرتنا الإخبارية',
    disclaimer: 'يمكنك إلغاء الاشتراك في أي وقت. يرجى العثور على معلومات الاتصال الخاصة بنا في شروط استخدام الموقع.',
    fbLogin: 'تسجيل الدخول عبر فيسبوك',
    googleLogin: 'تسجيل الدخول عبر جوجل',
    
  },
  es: {
    signUp: 'Registrarse',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo Electrónico',
    phone: 'Número de Teléfono',
    password: 'Contraseña',
    submit: 'Enviar',
    gender: 'Género',
    male: 'Masculino (H)',
    female: 'Femenino (F)',
    offers: 'Recibir ofertas de nuestros socios',
    newsletter: 'Recibir nuestro boletín',
    disclaimer: 'Puedes darte de baja en cualquier momento. Encuentra nuestra información de contacto en los términos de uso del sitio.',
    fbLogin: 'Conéctate con Facebook',
    googleLogin: 'Conéctate con Google',
    
  },
  zh: {
    signUp: '注册',
    firstName: '名',
    lastName: '姓',
    email: '电子邮件',
    phone: '电话号码',
    password: '密码',
    submit: '提交',
    gender: '性别',
    male: '男性 (H)',
    female: '女性 (F)',
    offers: '接收我们的合作伙伴提供的优惠',
    newsletter: '接收我们的新闻通讯',
    disclaimer: '您可以随时退订。请在网站使用条款中查找我们的联系信息。',
    fbLogin: '使用Facebook登录',
    googleLogin: '使用Google登录',
    
  },

};

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    countryCode: '+216',
    language: 'fr',
    gender: '',
    offers: false,
    newsletter: false,
    verified: false,
  });

  const images = [image1, image2];
  const [bgImage, setBgImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleLanguageChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, language: value });
  };

  const canSubmit = formData.firstName && formData.lastName && formData.email && formData.phone && formData.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSubmit) {
      try {
        const response = await axios.post('http://localhost:3000/inscription', {
          email: formData.email,
          prenom: formData.firstName,
          nom: formData.lastName,
          motDePasse: formData.password,
        });
        console.log(response.data);
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      } catch (error) {
        console.error(error);
        alert("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } else {
      alert("Veuillez vérifier que vous n'êtes pas un robot avant de soumettre le formulaire");
    }
  };

  const translate = languages[formData.language];

  // Placeholder functions for Facebook and Google login
  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Implement Facebook login functionality here
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement Google login functionality here
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${images[bgImage]})` }}>
      <div className="signup-box">
        <h2 className="signup-title">{translate.signUp}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={translate.firstName}
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={translate.lastName}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={translate.email}
            required
          />
          <div className="phone-container">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="country-code-selector"
            >
              <option value="+216">+216 Tunisia</option>
              <option value="+34">+34 Spain</option>
              <option value="+86">+86 China</option>
              <option value="+33">+33 France</option>
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
              <option value="+49">+49 Germany</option>
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder={translate.phone}
              required
              className="phone-input"
            />
          </div>

          <div className="gender-container">
            <label>{translate.gender}</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="H"
                  checked={formData.gender === 'H'}
                  onChange={handleChange}
                />{' '}
                {translate.male}
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="F"
                  checked={formData.gender === 'F'}
                  onChange={handleChange}
                />{' '}
                {translate.female}
              </label>
            </div>
          </div>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={translate.password}
            required
          />

          <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                name="offers"
                checked={formData.offers}
                onChange={handleCheckboxChange}
              />
              {translate.offers}
            </label>
            <label>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleCheckboxChange}
              />
              {translate.newsletter}
            </label>
          </div>

          <p className="disclaimer">{translate.disclaimer}</p>

          <button type="submit" disabled={!canSubmit}>{translate.submit}</button>
        </form>

        <div className="social-login">
          <button className="social-button facebook-button" onClick={handleFacebookLogin}>
            <i className="fab fa-facebook-f"></i>
            {translate.fbLogin}
          </button>
          <button className="social-button google-button" onClick={handleGoogleLogin}>
            <i className="fab fa-google"></i>
            {translate.googleLogin}
          </button>
        </div>

        <div className="language-selector">
          <label>
            Change Language:
            <select value={formData.language} onChange={handleLanguageChange}>
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="es">Español</option>
              <option value="zh">中文</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
