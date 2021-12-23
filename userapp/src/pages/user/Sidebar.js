import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import InlineButton from './../../components/InlineButton';
import './../dev.css';
import $ from 'jquery';


export default function Sidebar() {

    const [users, setUsers] = useState({});

    const { pathname } = useLocation();

    React.useEffect(() => {
        const userString = localStorage.getItem('userdata');
        var user = JSON.parse(userString);
        setUsers(user);
    }, [])

    const history = useHistory()

    React.useEffect(() => {
        return history.listen((location) => {

            if (location.pathname == "/my-studies"){
                
                submenu();
            }

            if (location.pathname == "/participants-in-my-studies") {
                
                submenu();
            }
        })
    }, [history])

    const submenu = () => {
        $(".sub-menu").toggleClass('sub-active');
    }

    return(
        <div className="side-bar">



          

            <svg xmlns="http://www.w3.org/2000/svg" style={{'display':'none'}}>
                <symbol id="icon-dashboard" viewBox="0 0 30 30">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9304 5.63379V7.63379H15.9304V5.63379H19.9304ZM9.93042 5.63379V11.6338H5.93042V5.63379H9.93042ZM19.9304 13.6338V19.6338H15.9304V13.6338H19.9304ZM9.93042 17.6338V19.6338H5.93042V17.6338H9.93042ZM21.9304 3.63379H13.9304V9.63379H21.9304V3.63379ZM11.9304 3.63379H3.93042V13.6338H11.9304V3.63379ZM21.9304 11.6338H13.9304V21.6338H21.9304V11.6338ZM11.9304 15.6338H3.93042V21.6338H11.9304V15.6338Z" />
                </symbol>
                <symbol id="icon-book" viewBox="0 0 30 30">
                    <path d="M5.93066 2.63379V18.6338H5.98166C5.90753 18.997 5.91508 19.3721 6.00378 19.732C6.09248 20.0919 6.2601 20.4276 6.49451 20.7147C6.72891 21.0019 7.02424 21.2333 7.35911 21.3923C7.69397 21.5512 8.05999 21.6337 8.43066 21.6338H18.9307V18.6338H19.9307V2.63379H5.93066ZM16.9307 19.6338H8.43066C8.29806 19.6338 8.17088 19.5811 8.07711 19.4873C7.98334 19.3936 7.93066 19.2664 7.93066 19.1338C7.93066 19.0012 7.98334 18.874 8.07711 18.7802C8.17088 18.6865 8.29806 18.6338 8.43066 18.6338H16.9307V19.6338ZM8.43066 16.6338C8.26271 16.634 8.09519 16.651 7.93066 16.6848V4.63379H17.9307V16.6338H8.43066Z" />
                    <path d="M15.9307 6.63379H9.93066V8.63379H15.9307V6.63379Z" />
                </symbol>
                <symbol id="icon-dashboard" viewBox="0 0 30 30">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9304 5.63379V7.63379H15.9304V5.63379H19.9304ZM9.93042 5.63379V11.6338H5.93042V5.63379H9.93042ZM19.9304 13.6338V19.6338H15.9304V13.6338H19.9304ZM9.93042 17.6338V19.6338H5.93042V17.6338H9.93042ZM21.9304 3.63379H13.9304V9.63379H21.9304V3.63379ZM11.9304 3.63379H3.93042V13.6338H11.9304V3.63379ZM21.9304 11.6338H13.9304V21.6338H21.9304V11.6338ZM11.9304 15.6338H3.93042V21.6338H11.9304V15.6338Z" />
                </symbol>
                <symbol id="icon-forum" viewBox="0 0 30 30">
                    <path d="M20.7339 18.8944H20.0477V23.1084L15.9306 18.8944H7.01016C6.2525 18.8944 5.66638 18.5579 5.25181 17.8848L8.38254 14.6804H16.6168C17.5603 14.6804 18.368 14.3366 19.0399 13.6489C19.7118 12.9612 20.0477 12.1345 20.0477 11.1688V6.25245H20.7339C21.3057 6.25245 21.7918 6.4573 22.1921 6.86699C22.5923 7.27669 22.7925 7.77417 22.7925 8.35945V16.7874C22.7925 17.3727 22.5923 17.8702 22.1921 18.2799C21.7918 18.6896 21.3057 18.8944 20.7339 18.8944ZM16.6168 13.2758H7.69635L3.57922 17.4898V13.2758H2.89304C2.32121 13.2758 1.83516 13.0709 1.43489 12.6612C1.03461 12.2515 0.834473 11.7541 0.834473 11.1688V2.74079C0.834473 2.15551 1.03461 1.65802 1.43489 1.24833C1.83516 0.838636 2.32121 0.633789 2.89304 0.633789H16.6168C17.1886 0.633789 17.6747 0.838636 18.0749 1.24833C18.4752 1.65802 18.6754 2.15551 18.6754 2.74079V11.1688C18.6754 11.7541 18.4752 12.2515 18.0749 12.6612C17.6747 13.0709 17.1886 13.2758 16.6168 13.2758Z" />
                </symbol>
                <symbol id="icon-group" viewBox="0 0 30 30">
                    <path d="M15.8134 0.633789C16.9838 0.633789 18.1061 1.1424 18.9337 2.04774C19.7612 2.95308 20.2261 4.18099 20.2261 5.46133C20.2261 6.74168 19.7612 7.96958 18.9337 8.87492C18.1061 9.78026 16.9838 10.2889 15.8134 10.2889C14.6431 10.2889 13.5208 9.78026 12.6932 8.87492C11.8657 7.96958 11.4008 6.74168 11.4008 5.46133C11.4008 4.18099 11.8657 2.95308 12.6932 2.04774C13.5208 1.1424 14.6431 0.633789 15.8134 0.633789ZM6.98813 4.08203C7.69415 4.08203 8.34975 4.28893 8.91709 4.66134C8.72798 6.63373 9.2575 8.59234 10.3418 10.1234C9.71137 11.4475 8.45061 12.3578 6.98813 12.3578C5.985 12.3578 5.02297 11.9219 4.31365 11.1459C3.60434 10.3699 3.20585 9.31736 3.20585 8.21993C3.20585 7.12249 3.60434 6.07 4.31365 5.29399C5.02297 4.51799 5.985 4.08203 6.98813 4.08203ZM24.6388 4.08203C25.6419 4.08203 26.6039 4.51799 27.3132 5.29399C28.0226 6.07 28.4211 7.12249 28.4211 8.21993C28.4211 9.31736 28.0226 10.3699 27.3132 11.1459C26.6039 11.9219 25.6419 12.3578 24.6388 12.3578C23.1763 12.3578 21.9155 11.4475 21.2852 10.1234C22.3844 8.57085 22.8946 6.6147 22.7098 4.66134C23.2771 4.28893 23.9327 4.08203 24.6388 4.08203ZM7.61851 18.2198C7.61851 15.3647 11.2873 13.0475 15.8134 13.0475C20.3396 13.0475 24.0084 15.3647 24.0084 18.2198V20.6336H7.61851V18.2198ZM0.684326 20.6336V18.5647C0.684326 16.6474 3.06716 15.0337 6.29471 14.5647C5.55086 15.5026 5.09699 16.7992 5.09699 18.2198V20.6336H0.684326ZM30.9426 20.6336H26.5299V18.2198C26.5299 16.7992 26.076 15.5026 25.3322 14.5647C28.5597 15.0337 30.9426 16.6474 30.9426 18.5647V20.6336Z" />
                </symbol>
                <symbol id="icon-research" viewBox="0 0 30 30">
                    <path d="M5.75042 15.6338L9.93042 17.9138V20.6338H2.93042C1.82042 20.6338 0.93042 19.7438 0.93042 18.6338V2.63379C0.93042 2.10336 1.14113 1.59465 1.51621 1.21958C1.89128 0.844503 2.39999 0.633789 2.93042 0.633789H3.93042V7.63379L6.43042 6.13379L8.93042 7.63379V0.633789H14.9304C15.4609 0.633789 15.9696 0.844503 16.3446 1.21958C16.7197 1.59465 16.9304 2.10336 16.9304 2.63379V11.1738L15.4304 10.3538L5.75042 15.6338ZM20.9304 15.6338L15.4304 12.6338L9.93042 15.6338L15.4304 18.6338L20.9304 15.6338ZM11.9304 17.7238V19.7238L15.4304 21.6338L18.9304 19.7238V17.7238L15.4304 19.6338L11.9304 17.7238Z" />
                </symbol>
                <symbol id="icon-settings" viewBox="0 0 30 30">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.3605 13.6138C20.4005 13.2938 20.4305 12.9738 20.4305 12.6338C20.4305 12.2938 20.4005 11.9738 20.3605 11.6538L22.4705 10.0038C22.6605 9.85379 22.7105 9.58379 22.5905 9.36379L20.5905 5.90379C20.5005 5.74379 20.3305 5.65379 20.1505 5.65379C20.0905 5.65379 20.0305 5.66379 19.9805 5.68379L17.4905 6.68379C16.9705 6.28379 16.4105 5.95379 15.8005 5.70379L15.4205 3.05379C15.3905 2.81379 15.1805 2.63379 14.9305 2.63379H10.9305C10.6805 2.63379 10.4705 2.81379 10.4405 3.05379L10.0605 5.70379C9.4505 5.95379 8.8905 6.29379 8.3705 6.68379L5.8805 5.68379C5.8205 5.66379 5.7605 5.65379 5.7005 5.65379C5.5305 5.65379 5.3605 5.74379 5.2705 5.90379L3.2705 9.36379C3.1405 9.58379 3.2005 9.85379 3.3905 10.0038L5.5005 11.6538C5.4605 11.9738 5.4305 12.3038 5.4305 12.6338C5.4305 12.9638 5.4605 13.2938 5.5005 13.6138L3.3905 15.2638C3.2005 15.4138 3.1505 15.6838 3.2705 15.9038L5.2705 19.3638C5.3605 19.5238 5.5305 19.6138 5.7105 19.6138C5.7705 19.6138 5.8305 19.6038 5.8805 19.5838L8.3705 18.5838C8.8905 18.9838 9.4505 19.3138 10.0605 19.5638L10.4405 22.2138C10.4705 22.4538 10.6805 22.6338 10.9305 22.6338H14.9305C15.1805 22.6338 15.3905 22.4538 15.4205 22.2138L15.8005 19.5638C16.4105 19.3138 16.9705 18.9738 17.4905 18.5838L19.9805 19.5838C20.0405 19.6038 20.1005 19.6138 20.1605 19.6138C20.3305 19.6138 20.5005 19.5238 20.5905 19.3638L22.5905 15.9038C22.7105 15.6838 22.6605 15.4138 22.4705 15.2638L20.3605 13.6138ZM18.3805 11.9038C18.4205 12.2138 18.4305 12.4238 18.4305 12.6338C18.4305 12.8438 18.4105 13.0638 18.3805 13.3638L18.2405 14.4938L19.1305 15.1938L20.2105 16.0338L19.5105 17.2438L18.2405 16.7338L17.2005 16.3138L16.3005 16.9938C15.8705 17.3138 15.4605 17.5538 15.0505 17.7238L13.9905 18.1538L13.8305 19.2838L13.6305 20.6338H12.2305L12.0405 19.2838L11.8805 18.1538L10.8205 17.7238C10.3905 17.5438 9.9905 17.3138 9.5905 17.0138L8.6805 16.3138L7.6205 16.7438L6.3505 17.2538L5.6505 16.0438L6.7305 15.2038L7.6205 14.5038L7.4805 13.3738C7.4505 13.0638 7.4305 12.8338 7.4305 12.6338C7.4305 12.4338 7.4505 12.2038 7.4805 11.9038L7.6205 10.7738L6.7305 10.0738L5.6505 9.23379L6.3505 8.02379L7.6205 8.53379L8.6605 8.95379L9.5605 8.27379C9.9905 7.95379 10.4005 7.71379 10.8105 7.54379L11.8705 7.11379L12.0305 5.98379L12.2305 4.63379H13.6205L13.8105 5.98379L13.9705 7.11379L15.0305 7.54379C15.4605 7.72379 15.8605 7.95379 16.2605 8.25379L17.1705 8.95379L18.2305 8.52379L19.5005 8.01379L20.2005 9.22379L19.1305 10.0738L18.2405 10.7738L18.3805 11.9038ZM12.9305 8.63379C10.7205 8.63379 8.9305 10.4238 8.9305 12.6338C8.9305 14.8438 10.7205 16.6338 12.9305 16.6338C15.1405 16.6338 16.9305 14.8438 16.9305 12.6338C16.9305 10.4238 15.1405 8.63379 12.9305 8.63379ZM12.9305 14.6338C11.8305 14.6338 10.9305 13.7338 10.9305 12.6338C10.9305 11.5338 11.8305 10.6338 12.9305 10.6338C14.0305 10.6338 14.9305 11.5338 14.9305 12.6338C14.9305 13.7338 14.0305 14.6338 12.9305 14.6338Z" />
                </symbol>
                <symbol id="icon-webinar" viewBox="0 0 30 30">
                    <path d="M11.0652 4.63379C9.20867 4.63379 7.42819 5.37129 6.11544 6.68404C4.80268 7.9968 4.06519 9.77727 4.06519 11.6338H6.06519C6.06519 10.3077 6.59197 9.03594 7.52965 8.09826C8.46733 7.16057 9.7391 6.63379 11.0652 6.63379C12.3913 6.63379 13.663 7.16057 14.6007 8.09826C15.5384 9.03594 16.0652 10.3077 16.0652 11.6338H18.0652C18.0652 9.77727 17.3277 7.9968 16.0149 6.68404C14.7022 5.37129 12.9217 4.63379 11.0652 4.63379ZM12.0652 13.9238C12.9452 13.5338 13.5652 12.6638 13.5652 11.6338C13.5652 10.9707 13.3018 10.3349 12.833 9.86602C12.3641 9.39718 11.7282 9.13379 11.0652 9.13379C10.4021 9.13379 9.76626 9.39718 9.29742 9.86602C8.82858 10.3349 8.56519 10.9707 8.56519 11.6338C8.56519 12.6338 9.18519 13.5338 10.0652 13.9238V17.2238L6.65519 20.6338L8.06519 22.0438L11.0652 19.0438L14.0652 22.0438L15.4752 20.6338L12.0652 17.2238V13.9238ZM11.0652 0.633789C8.1478 0.633789 5.34991 1.79271 3.28701 3.85561C1.22411 5.91851 0.0651855 8.71641 0.0651855 11.6338H2.06519C2.06519 9.24684 3.0134 6.95765 4.70122 5.26983C6.38905 3.582 8.67824 2.63379 11.0652 2.63379C13.4521 2.63379 15.7413 3.582 17.4291 5.26983C19.117 6.95765 20.0652 9.24684 20.0652 11.6338H22.0652C22.0652 8.71641 20.9063 5.91851 18.8434 3.85561C16.7805 1.79271 13.9826 0.633789 11.0652 0.633789Z" />
                </symbol>
                <symbol id="icon-article" viewBox="0 0 30 30">
                    <path d="M48.3601 17.6338L47.532 14.915H43.3679L42.5398 17.6338H39.9304L43.9617 6.16504H46.9226L50.9695 17.6338H48.3601ZM46.9539 12.8838C46.1882 10.4202 45.7559 9.02702 45.657 8.7041C45.5632 8.38118 45.4955 8.12598 45.4539 7.93848C45.282 8.60514 44.7898 10.2536 43.9773 12.8838H46.9539ZM57.1823 8.73535C57.5052 8.73535 57.7734 8.75879 57.987 8.80566L57.8073 11.04C57.6146 10.988 57.3802 10.9619 57.1042 10.9619C56.3438 10.9619 55.75 11.1572 55.3229 11.5479C54.901 11.9385 54.6901 12.4854 54.6901 13.1885V17.6338H52.3073V8.89941H54.112L54.4635 10.3682H54.5807C54.8516 9.87858 55.2161 9.48535 55.6745 9.18848C56.138 8.88639 56.6406 8.73535 57.1823 8.73535ZM63.3326 15.8916C63.7493 15.8916 64.2493 15.8005 64.8326 15.6182V17.3916C64.2389 17.6572 63.5097 17.79 62.6451 17.79C61.692 17.79 60.9967 17.5505 60.5592 17.0713C60.1269 16.5869 59.9107 15.863 59.9107 14.8994V10.6885H58.7701V9.68066L60.0826 8.88379L60.7701 7.04004H62.2935V8.89941H64.7389V10.6885H62.2935V14.8994C62.2935 15.238 62.3873 15.488 62.5748 15.6494C62.7675 15.8109 63.0201 15.8916 63.3326 15.8916ZM66.5845 6.6416C66.5845 5.86556 67.0168 5.47754 67.8814 5.47754C68.7459 5.47754 69.1782 5.86556 69.1782 6.6416C69.1782 7.01139 69.0689 7.30046 68.8501 7.50879C68.6366 7.71191 68.3136 7.81348 67.8814 7.81348C67.0168 7.81348 66.5845 7.42285 66.5845 6.6416ZM69.0689 17.6338H66.686V8.89941H69.0689V17.6338ZM75.2035 17.79C72.4848 17.79 71.1254 16.2979 71.1254 13.3135C71.1254 11.8291 71.4952 10.6963 72.2348 9.91504C72.9744 9.12858 74.0343 8.73535 75.4145 8.73535C76.4249 8.73535 77.3311 8.93327 78.1332 9.3291L77.4301 11.1729C77.0551 11.0218 76.7061 10.8994 76.3832 10.8057C76.0603 10.7067 75.7374 10.6572 75.4145 10.6572C74.1749 10.6572 73.5551 11.5374 73.5551 13.2979C73.5551 15.0062 74.1749 15.8604 75.4145 15.8604C75.8728 15.8604 76.2973 15.8005 76.6879 15.6807C77.0785 15.5557 77.4692 15.363 77.8598 15.1025V17.1416C77.4744 17.3864 77.0838 17.5557 76.6879 17.6494C76.2973 17.7432 75.8025 17.79 75.2035 17.79ZM82.3539 17.6338H79.971V5.47754H82.3539V17.6338ZM88.5589 10.4307C88.0536 10.4307 87.6578 10.5921 87.3714 10.915C87.0849 11.2327 86.9208 11.6859 86.8792 12.2744H90.2229C90.2125 11.6859 90.0589 11.2327 89.762 10.915C89.4651 10.5921 89.0641 10.4307 88.5589 10.4307ZM88.8948 17.79C87.4885 17.79 86.3896 17.402 85.5979 16.626C84.8063 15.8499 84.4104 14.751 84.4104 13.3291C84.4104 11.8656 84.775 10.7354 85.5042 9.93848C86.2385 9.13639 87.2516 8.73535 88.5432 8.73535C89.7776 8.73535 90.7385 9.08691 91.426 9.79004C92.1135 10.4932 92.4573 11.4645 92.4573 12.7041V13.8604H86.8245C86.8505 14.5374 87.051 15.0661 87.426 15.4463C87.801 15.8265 88.3271 16.0166 89.0042 16.0166C89.5302 16.0166 90.0276 15.9619 90.4964 15.8525C90.9651 15.7432 91.4547 15.5687 91.9651 15.3291V17.1729C91.5484 17.3812 91.1031 17.5348 90.6292 17.6338C90.1552 17.738 89.5771 17.79 88.8948 17.79ZM109.461 17.6338H106.516L105.617 16.751C104.623 17.4437 103.498 17.79 102.242 17.79C100.971 17.79 99.9636 17.4984 99.2189 16.915C98.4741 16.3317 98.1017 15.5426 98.1017 14.5479C98.1017 13.8343 98.2579 13.2275 98.5704 12.7275C98.8881 12.2223 99.4298 11.751 100.195 11.3135C99.8048 10.8656 99.5209 10.4385 99.3439 10.0322C99.1668 9.62077 99.0782 9.17285 99.0782 8.68848C99.0782 7.89681 99.3803 7.25879 99.9845 6.77441C100.594 6.29004 101.406 6.04785 102.422 6.04785C103.391 6.04785 104.164 6.27441 104.742 6.72754C105.326 7.17546 105.617 7.77702 105.617 8.53223C105.617 9.15202 105.438 9.71973 105.078 10.2354C104.719 10.7458 104.138 11.2327 103.336 11.6963L105.555 13.8604C105.925 13.251 106.245 12.4671 106.516 11.5088H109C108.813 12.2119 108.555 12.8994 108.227 13.5713C107.899 14.238 107.526 14.8291 107.109 15.3447L109.461 17.6338ZM100.609 14.3213C100.609 14.7692 100.776 15.126 101.109 15.3916C101.448 15.6572 101.88 15.79 102.406 15.79C103.063 15.79 103.654 15.6312 104.18 15.3135L101.586 12.7354C101.284 12.9645 101.044 13.2041 100.867 13.4541C100.695 13.7041 100.609 13.9932 100.609 14.3213ZM103.414 8.78223C103.414 8.50618 103.32 8.29004 103.133 8.13379C102.945 7.97233 102.703 7.8916 102.406 7.8916C102.057 7.8916 101.781 7.97493 101.578 8.1416C101.38 8.30827 101.281 8.54525 101.281 8.85254C101.281 9.31087 101.529 9.81608 102.024 10.3682C102.471 10.1182 102.815 9.87337 103.055 9.63379C103.294 9.389 103.414 9.10514 103.414 8.78223ZM121.73 6.21191H124.176L120.293 17.6338H117.652L113.777 6.21191H116.223L118.371 13.0088C118.491 13.4098 118.613 13.8786 118.738 14.415C118.868 14.9463 118.949 15.3161 118.98 15.5244C119.038 15.0452 119.233 14.2067 119.566 13.0088L121.73 6.21191ZM125.412 6.6416C125.412 5.86556 125.844 5.47754 126.709 5.47754C127.573 5.47754 128.006 5.86556 128.006 6.6416C128.006 7.01139 127.896 7.30046 127.678 7.50879C127.464 7.71191 127.141 7.81348 126.709 7.81348C125.844 7.81348 125.412 7.42285 125.412 6.6416ZM127.896 17.6338H125.514V8.89941H127.896V17.6338ZM133.25 17.79C132.224 17.79 131.416 17.3916 130.828 16.5947C130.245 15.7979 129.953 14.6937 129.953 13.2822C129.953 11.8499 130.25 10.7354 130.844 9.93848C131.443 9.13639 132.265 8.73535 133.312 8.73535C134.411 8.73535 135.25 9.16243 135.828 10.0166H135.906C135.786 9.36556 135.726 8.78483 135.726 8.27441V5.47754H138.117V17.6338H136.289L135.828 16.501H135.726C135.185 17.3604 134.359 17.79 133.25 17.79ZM134.086 15.8916C134.695 15.8916 135.14 15.7145 135.422 15.3604C135.708 15.0062 135.864 14.4046 135.89 13.5557V13.2979C135.89 12.3604 135.745 11.6885 135.453 11.2822C135.166 10.876 134.698 10.6729 134.047 10.6729C133.515 10.6729 133.101 10.8994 132.804 11.3525C132.513 11.8005 132.367 12.4541 132.367 13.3135C132.367 14.1729 132.515 14.8187 132.812 15.251C133.109 15.6781 133.534 15.8916 134.086 15.8916ZM144.306 10.4307C143.801 10.4307 143.405 10.5921 143.119 10.915C142.832 11.2327 142.668 11.6859 142.627 12.2744H145.97C145.96 11.6859 145.806 11.2327 145.509 10.915C145.213 10.5921 144.812 10.4307 144.306 10.4307ZM144.642 17.79C143.236 17.79 142.137 17.402 141.345 16.626C140.554 15.8499 140.158 14.751 140.158 13.3291C140.158 11.8656 140.523 10.7354 141.252 9.93848C141.986 9.13639 142.999 8.73535 144.291 8.73535C145.525 8.73535 146.486 9.08691 147.174 9.79004C147.861 10.4932 148.205 11.4645 148.205 12.7041V13.8604H142.572C142.598 14.5374 142.799 15.0661 143.174 15.4463C143.549 15.8265 144.075 16.0166 144.752 16.0166C145.278 16.0166 145.775 15.9619 146.244 15.8525C146.713 15.7432 147.202 15.5687 147.713 15.3291V17.1729C147.296 17.3812 146.851 17.5348 146.377 17.6338C145.903 17.738 145.325 17.79 144.642 17.79ZM152.121 13.251C152.121 14.1156 152.261 14.7692 152.543 15.2119C152.829 15.6546 153.293 15.876 153.933 15.876C154.569 15.876 155.024 15.6572 155.3 15.2197C155.582 14.777 155.722 14.1208 155.722 13.251C155.722 12.3864 155.582 11.738 155.3 11.3057C155.019 10.8734 154.558 10.6572 153.918 10.6572C153.282 10.6572 152.824 10.8734 152.543 11.3057C152.261 11.7327 152.121 12.3812 152.121 13.251ZM158.16 13.251C158.16 14.6729 157.785 15.7848 157.035 16.5869C156.285 17.389 155.241 17.79 153.902 17.79C153.063 17.79 152.324 17.6077 151.683 17.2432C151.043 16.8734 150.55 16.3447 150.207 15.6572C149.863 14.9697 149.691 14.1676 149.691 13.251C149.691 11.8239 150.063 10.7145 150.808 9.92285C151.553 9.13118 152.6 8.73535 153.949 8.73535C154.787 8.73535 155.527 8.91764 156.168 9.28223C156.808 9.64681 157.3 10.1702 157.644 10.8525C157.988 11.5348 158.16 12.3343 158.16 13.251ZM166.302 15.04C166.302 15.9359 165.99 16.6182 165.365 17.0869C164.745 17.5557 163.815 17.79 162.576 17.79C161.94 17.79 161.399 17.7458 160.951 17.6572C160.503 17.5739 160.084 17.4489 159.693 17.2822V15.3135C160.136 15.5218 160.633 15.6963 161.185 15.8369C161.742 15.9775 162.232 16.0479 162.654 16.0479C163.518 16.0479 163.951 15.7979 163.951 15.2979C163.951 15.1104 163.893 14.9593 163.779 14.8447C163.664 14.7249 163.466 14.5921 163.185 14.4463C162.904 14.2952 162.529 14.1208 162.06 13.9229C161.388 13.6416 160.893 13.3812 160.576 13.1416C160.263 12.902 160.034 12.6286 159.888 12.3213C159.748 12.0088 159.677 11.626 159.677 11.1729C159.677 10.3968 159.977 9.79785 160.576 9.37598C161.18 8.94889 162.034 8.73535 163.138 8.73535C164.19 8.73535 165.214 8.96452 166.209 9.42285L165.49 11.1416C165.052 10.9541 164.643 10.8005 164.263 10.6807C163.883 10.5609 163.495 10.501 163.099 10.501C162.396 10.501 162.044 10.6911 162.044 11.0713C162.044 11.2848 162.156 11.4697 162.38 11.626C162.61 11.7822 163.107 12.014 163.873 12.3213C164.555 12.5973 165.055 12.8551 165.373 13.0947C165.69 13.3343 165.925 13.6104 166.076 13.9229C166.227 14.2354 166.302 14.6077 166.302 15.04Z" fill="black" />
                    <path d="M2.20495 0.680664H21.9255C22.6034 0.680664 23.1581 1.23531 23.1581 1.9132V21.6338L0.972412 21.6091V1.9132C0.972412 1.23531 1.52705 0.680664 2.20495 0.680664ZM7.1351 1.9132L4.67002 5.61081H5.90256L8.36763 1.9132H7.1351ZM12.0652 1.9132H10.8327L8.36763 5.61081H9.60017L12.0652 1.9132ZM15.7629 1.9132H14.5303L12.0652 5.61081H13.2978L15.7629 1.9132ZM19.4605 1.9132H18.2279L15.7629 5.61081H16.9954L19.4605 1.9132ZM20.693 19.1687V6.84335H3.43749V19.1687H20.693ZM9.60017 8.07588L16.9954 13.006L9.60017 17.9362V8.07588Z" />
                </symbol>                 


                <symbol id="icon-blog" viewBox="0 0 30 30">
                    <g id="a7dd31c7-f0c3-4e14-adb5-5f642c615ffb" data-name="Layer 2">
                        <g id="ab72bc86-5c0b-4bbd-aa8e-ffe8e923a82f" data-name="Layer 1">
                            <g id="af94ef60-1a92-4df7-8ed1-5d45bb5ee7f4" data-name="Page-1">
                                <g id="edf6a07b-5fc2-4b62-9b47-692c1a11d925" data-name="Blog">
                                    <polygon id="a9b0f069-fe9b-48f8-a190-eb1949c3b145" data-name="Path" points="2.92 1.95 3.9 1.95 3.9 2.92 2.92 2.92 2.92 1.95" />
                                    <polygon id="ad5d1276-b3e3-4643-9178-66a323865484" data-name="Path" points="4.87 1.95 5.85 1.95 5.85 2.92 4.87 2.92 4.87 1.95" />
                                    <polygon id="a94aa35e-34f6-4b62-8614-ae76dd0a901e" data-name="Path" points="6.82 1.95 7.8 1.95 7.8 2.92 6.82 2.92 6.82 1.95" />
                                    <path id="f96f0dd9-5d11-4116-8c82-15113c207cc1" data-name="Shape" d="M9.26,6.82H3.41a.49.49,0,0,0-.49.49v4.88a.5.5,0,0,0,.15.34.48.48,0,0,0,.34.14H9.26a.52.52,0,0,0,.35-.14.49.49,0,0,0,.14-.34V7.31A.48.48,0,0,0,9.61,7,.49.49,0,0,0,9.26,6.82ZM8.77,11.7H3.9V7.8H8.77Z" />
                                    <polygon id="bf798e1f-4336-4c0b-8fbc-04e4ca1bdcb0" data-name="Path" points="11.7 6.82 13.65 6.82 13.65 7.8 11.7 7.8 11.7 6.82" />
                                    <polygon id="f286df66-b5b6-4e8f-95e0-469a070f3001" data-name="Path" points="14.62 6.82 22.42 6.82 22.42 7.8 14.62 7.8 14.62 6.82" />
                                    <polygon id="bfb27260-bea2-450d-8e43-fab24b1de955" data-name="Path" points="11.7 8.77 22.42 8.77 22.42 9.75 11.7 9.75 11.7 8.77" />
                                    <polygon id="fd0e825c-bb71-4344-be6f-79403a7fdb90" data-name="Path" points="11.7 10.72 16.57 10.72 16.57 11.7 11.7 11.7 11.7 10.72" />
                                    <polygon id="bd359010-bc57-4966-8314-5c4fdf346d5f" data-name="Path" points="17.55 10.72 20.47 10.72 20.47 11.7 17.55 11.7 17.55 10.72" />
                                    <polygon id="e41a1ef7-d6e2-4f42-b48d-d14a5fc1ed1e" data-name="Path" points="2.92 14.62 9.75 14.62 9.75 15.6 2.92 15.6 2.92 14.62" />
                                    <polygon id="ba26742c-3381-469a-abce-a7078f4ac1ac" data-name="Path" points="2.92 16.57 9.75 16.57 9.75 17.55 2.92 17.55 2.92 16.57" />
                                    <polygon id="b3b15cfa-4645-43ff-bc2b-13be6264a249" data-name="Path" points="2.92 18.52 9.75 18.52 9.75 19.5 2.92 19.5 2.92 18.52" />
                                    <polygon id="bcd6b543-7173-488e-b8ce-7a93f1c8f9e1" data-name="Path" points="2.92 20.47 9.75 20.47 9.75 21.45 2.92 21.45 2.92 20.47" />
                                    <path id="a4a23926-d5b6-4ae6-af46-6c2c6c8fac82" data-name="Shape" d="M27.78,6.38a2.38,2.38,0,0,0-1.22-.33,2.33,2.33,0,0,0-1.21.34V1.46A1.47,1.47,0,0,0,23.88,0H1.46a1.42,1.42,0,0,0-1,.43,1.42,1.42,0,0,0-.43,1V23.88a1.47,1.47,0,0,0,1.46,1.47H23.88a1.47,1.47,0,0,0,1.47-1.47v-8.4l3.32-5.77a2.42,2.42,0,0,0-.89-3.33ZM18,20.47H12.67V15.6h7l-1.29,2.23a.42.42,0,0,0-.06.27l.1,1.61Zm.63.86.48-.84.85.49-.49.84a.49.49,0,0,1-.66.18.48.48,0,0,1-.18-.67Zm2-1.09-1.24-.71-.07-1.17,2.36,1.37Zm1.62-1.31-.84-.49L25,12.11l-.85-.49L20.54,18l-.85-.48,4.14-7.18,2.54,1.46Zm2.1-9.48L24.56,9l2.54,1.46-.25.42ZM1.46,1H23.88a.51.51,0,0,1,.35.15.48.48,0,0,1,.14.34V3.91H1V1.46A.49.49,0,0,1,1.46,1ZM24.37,23.88a.48.48,0,0,1-.49.49H1.46A.49.49,0,0,1,1,23.88v-19h23.4V7.42l-4.16,7.2h-8a.49.49,0,0,0-.48.49V21a.48.48,0,0,0,.14.34.5.5,0,0,0,.34.15h5.38A1.42,1.42,0,0,0,18,22.63a1.46,1.46,0,0,0,1.21.39,1.52,1.52,0,0,0,1.06-.71l.65-1.14,1.45-.71a.64.64,0,0,0,.2-.2l1.79-3.1ZM27.83,9.22l-.24.42L25.05,8.18l.25-.42a1.46,1.46,0,0,1,2.53,1.46Z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </symbol>
                <symbol id="icon-article" viewBox="0 0 30 30">
                    <g id="ad0a9e6f-15c8-42da-aa68-225b830b1b38" data-name="Layer 2">
                        <g id="a0c4c605-0cf8-4a6c-baa7-5041de5bb4b8" data-name="Layer 1">
                            <g id="af5180b9-3314-413e-8196-eb659a472427" data-name="Page-1">
                                <g id="f949487d-983d-4f70-9a27-0cdf939d6adb" data-name="Event">
                                    <path id="ef0fee73-4cd2-4b26-a2a3-714e3e2041c5" data-name="Shape" d="M29.26,29.7H.44A.43.43,0,0,1,0,29.26V.44A.43.43,0,0,1,.44,0H29.26a.43.43,0,0,1,.44.44V29.26A.43.43,0,0,1,29.26,29.7ZM.88,28.82H28.82V.88H.88Z" />
                                    <path id="e799c35e-04d0-40f9-ab61-e510720c31e5" data-name="Path" d="M29.26,5.89H.44A.43.43,0,0,1,0,5.45.44.44,0,0,1,.44,5H29.26a.44.44,0,0,1,.44.44A.43.43,0,0,1,29.26,5.89Z" />
                                    <polygon id="a474fa33-5617-469c-986e-e530e80bc0bb" data-name="Path" points="2.94 2.32 4.2 2.32 4.2 3.57 2.94 3.57 2.94 2.32" />
                                    <polygon id="a255b88f-c851-46ae-8833-18cd734c4609" data-name="Path" points="6.08 2.32 7.33 2.32 7.33 3.57 6.08 3.57 6.08 2.32" />
                                    <polygon id="a57a0456-d273-49c5-9be8-acd6283e4d26" data-name="Path" points="9.21 2.32 10.46 2.32 10.46 3.57 9.21 3.57 9.21 2.32" />
                                    <polygon id="a84e78ab-f24a-4d0c-aac0-faa6145e5eaf" data-name="Path" points="21.74 2.32 23 2.32 23 3.57 21.74 3.57 21.74 2.32" />
                                    <polygon id="e8d62892-033b-449b-85b6-ac2dac57bfea" data-name="Path" points="24.88 2.32 26.75 2.32 26.75 3.57 24.88 3.57 24.88 2.32" />
                                    <path id="ad476e23-721d-4fb6-a86d-e7904ec0b2c8" data-name="Shape" d="M26.13,26.57H3.57a.44.44,0,0,1-.44-.44V8.58a.44.44,0,0,1,.44-.43H26.13a.44.44,0,0,1,.44.43V26.13A.44.44,0,0,1,26.13,26.57ZM4,25.69H25.69V9H4Z" />
                                    <path id="a95e8afb-03db-4e63-bd04-e1b58eae1850" data-name="Shape" d="M10.93,23.43a.39.39,0,0,1-.25-.08.42.42,0,0,1-.16-.49l1.4-4.29L8.26,15.91a.43.43,0,0,1-.16-.49.44.44,0,0,1,.42-.3H13l1.4-4.3a.44.44,0,0,1,.42-.3.46.46,0,0,1,.42.3l1.4,4.3h4.51a.44.44,0,0,1,.42.3.44.44,0,0,1-.15.49l-3.66,2.66,1.4,4.29a.45.45,0,0,1-.16.49.41.41,0,0,1-.51,0L14.85,20.7l-3.66,2.65a.38.38,0,0,1-.26.08ZM9.86,16l2.83,2a.42.42,0,0,1,.15.49l-1.07,3.32,2.82-2.05a.45.45,0,0,1,.52,0l2.82,2.05-1.07-3.32A.44.44,0,0,1,17,18l2.83-2H16.35a.46.46,0,0,1-.42-.3l-1.08-3.32-1.08,3.32a.42.42,0,0,1-.42.3Z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </symbol>
                <symbol id="icon-event" viewBox="0 0 30 30">
                    <g id="bcbda92c-7c44-424e-bcf5-89e0e44ada41" data-name="Layer 2">
                        <g id="ba0bcf5d-3c6c-48bf-b153-28aa9a0b2e68" data-name="Layer 1">
                            <g id="be960ccc-1cb5-4da8-a6a2-15bd071e7612" data-name="Page-1">
                                <g id="b6839d87-be06-4ef1-94ed-c12cc974b1b8" data-name="Article">
                                    <path id="a1d6c605-fd8d-467f-9492-4dd83daf6a00" data-name="Shape" d="M2.63,0A2.63,2.63,0,0,0,0,2.63v24.8a2.64,2.64,0,0,0,2.63,2.64H26.09a4,4,0,0,0,4-4V14.42a.52.52,0,0,0-.52-.52h-6.4V2.63A2.64,2.64,0,0,0,20.51,0Zm0,1H20.51a1.58,1.58,0,0,1,1.6,1.59V26.09A4,4,0,0,0,23.42,29H2.63A1.59,1.59,0,0,1,1,27.43V2.63A1.58,1.58,0,0,1,2.63,1ZM4.54,5.28a.52.52,0,0,0-.47.52v4a.52.52,0,0,0,.52.52h14a.52.52,0,0,0,.52-.52v-4a.52.52,0,0,0-.52-.52h-14Zm.57,1H18v3H5.11Zm-.57,7.25h0a.52.52,0,0,0-.48.55.51.51,0,0,0,.53.49h14a.54.54,0,0,0,.38-.15.53.53,0,0,0,0-.74.54.54,0,0,0-.38-.15h-14Zm18.61,1.37H29V26.09a2.94,2.94,0,0,1-5.88,0V14.94ZM4.59,17.06a.51.51,0,0,0-.37.15.51.51,0,0,0-.16.37.52.52,0,0,0,.16.37.51.51,0,0,0,.37.15h14a.54.54,0,0,0,.38-.15.56.56,0,0,0,.15-.37.51.51,0,0,0-.53-.52Zm0,3.49a.52.52,0,0,0,0,1h14a.52.52,0,0,0,0-1Z" />
                                </g>
                            </g>
                        </g>
                    </g>
                </symbol>

            </svg>
            <ul>
                {users && (users.role == 3 || users.role == 2) &&     <li>
                    <NavLink activeClassName="active" to="/dashboard">
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-dashboard"></use>
                        </svg><InlineButton name={"Dashboard"} />
                    </NavLink>
                </li>}
                <li>
                    <NavLink activeClassName="active" to="/articles" isActive={() => ['/articles', '/article-detail', '/article-payment'].includes(pathname)}>
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-article"></use>
                        </svg>
                        <InlineButton name={"Articles"} />
                    </NavLink>                    
                </li>
                <li>
                    <NavLink activeClassName="active" isActive={() => ['/blog', '/blog-detail', '/blog-payment', '/my-blog'].includes(pathname)} to="/blog">
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-blog"></use>
                        </svg>
                        <InlineButton name={"Blogs"} />
                    </NavLink>                    
                </li>                
                <li>
                    <NavLink activeClassName="active" to="/events">
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-event"></use>
                        </svg>
                        <InlineButton name={"Events"} />
                    </NavLink>
                </li>
                {users && (users.role == 3 || users.role == 2) && <li>
                    <NavLink activeClassName="active" isActive={() => ['/forum','/forum-sub', '/forum-detail', '/my-forum'].includes(pathname)} to="/forum">
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-forum"></use>
                        </svg>
                        <InlineButton name={"Forums"} />
                    </NavLink>                    
                </li>}
                <li>
                    <NavLink activeClassName="active" to="/informational-video" isActive={() => ['/informational-video', '/video-detail', '/video-payment'].includes(pathname)}>
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-article"></use>
                        </svg>
                        <InlineButton name={"Informational Videos"} />
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/group-session">
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-group"></use>
                        </svg>
                        <InlineButton name={"Group Sessions"} />
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/professional-development" isActive={() => ['/professional-development', '/professional-development-detail', '/course-payment'].includes(pathname)}>
                        <svg className="icon icon-tag">
                            <use xlinkHref="#icon-book"></use>
                        </svg>
                        <InlineButton name={"Professional Development"} />
                    </NavLink>
                </li>
                           
                             
                {users && users.role == 3 &&                
                    <li className="dropdown sub-menu">
                        <a activeClassName="active" id="sub-click" onClick={(e) => submenu()}  href="javascript:;" >
                        <svg className="icon icon-tag">
                                <use xlinkHref="#icon-research"></use>
                            </svg>
                            <span>Studies/Research</span>
                        </a>
                        <ul>
                            <li>
                                <NavLink activeClassName="active" to="/my-studies"><span>My Studies</span></NavLink></li>
                            <li>
                                <NavLink activeClassName="active" to="/participants-in-my-studies"><span>Participants</span></NavLink>
                            </li>
                        </ul>
                    </li>
                }               

            </ul>

            
        </div>
    )
}