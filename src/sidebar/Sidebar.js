import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from "@material-ui/icons/Add"
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import CallIcon from "@material-ui/icons/Call"
import { Avatar } from '@material-ui/core';
import MicIcon from "@material-ui/icons/Mic"
import HeadsetIcon from "@material-ui/icons/Headset"
import SettingsIcon from "@material-ui/icons/Settings"
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase'
import { useState } from 'react'
import Popup from 'reactjs-popup'
import SidebarChannel from './SidebarChannel';
import "./Sidebar.css"
function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
 
    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({ 
                id: doc.id,
                channel: doc.data(),
            })))
          )
        );
    }, [] )

    const menu = (
        <Popup trigger={<button> Add Channel </button>} menu>
            <span>Test</span>
        </Popup>
    )
    
    const handleAddChannel = () => {
        const channelName = prompt('Enter Channel Name')

        if (channelName) {
            db.collection('channels').add({
                channelName: channelName
            });
        }
    }

    return (
    <div className ='sidebar'>
      
      
        <div className ='sidebar_top'>
        <h3>Yuukis Discord</h3>
        <ExpandMoreIcon className="expand" />
        </div>
      
        <div className="sidebar_channels">
            <div className="sidebar_channelsHeader">
                <div className="sidebar_header">
                <ExpandMoreIcon />
                <h4>Text Channels</h4>
                </div>

            <AddIcon onClick= {menu} className="sidebar_addChannel" />   
            </div>
            <div className="sidebar_channelsList">
                {channels.map(({ id, channel }) => (
                    <SidebarChannel 
                    key={id} 
                    id={id} 
                    channelName={channel.channelName} />
                ))}
            </div>
        </div>
        
        <div className="sidebar_voice">
            <SignalCellularAltIcon
                className="sidebar_voiceIcon"
                fontSize="medium"
                />
            <div className="sidebar_voiceInfo">
                <h4>Voice Connected</h4>
                    <p>e</p>
            </div>
            <div className="sidebar_voiceIcons">
                <InfoOutlinedIcon 
                fontSize="small"
                />
                <CallIcon 
                fontSize="small"
                />
            </div>
        </div>
        <div className="sidebar_profile">
            <Avatar className="logout" onClick={() => auth.signOut()} src={user.photo} />
            <div className="sidebar_profileInfo">
            <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0,4)}</p>
            </div>

            <div className="sidebar_profileIcons">
                <MicIcon 
                fontSize="small"
                />
                <HeadsetIcon 
                fontSize="small"
                />
                <SettingsIcon 
                fontSize="small"
                />
            </div>
        </div>
    </div>
    );
}

export default Sidebar