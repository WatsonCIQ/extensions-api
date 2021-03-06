import React, { useState, useEffect } from 'react'
import "./styles/TitleBar.css"
/* global fdc3 */

function Linker(props) {
  return (
    <svg width={15} height={15} viewBox="2 1 13 13" {...props}>
      <defs>
        <filter
          id="prefix__a"
          x="-28.6%"
          y="-7.1%"
          width="157.1%"
          height="128.6%"
        >
          <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation={0.5}
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
        </filter>
        <path
          id="prefix__b"
          d="M17.925 15.425h-1v-2.5a2.5 2.5 0 00-5 0v2.5h-1v-2.5a3.5 3.5 0 117 0v2.5zm0 2v2.5a3.5 3.5 0 11-7 0v-2.5h1v2.5a2.5 2.5 0 005 0v-2.5h1zm-3.5-4a.5.5 0 01.5.5v5a.5.5 0 01-1 0v-5a.5.5 0 01.5-.5z"
        />
      </defs>
      <g transform="rotate(45 22.289 4.682)" fill={props.fill}>
        <use filter="url(#prefix__a)" xlinkHref="#prefix__b" />
        <use xlinkHref="#prefix__b" />
      </g>
    </svg>
  );
}

const MemoLinker = React.memo(Linker);


export default function TitleBar() {
  const [channels, setChannels] = useState([])
  const [selectedChannelColor, setSelectedChannelColor] = useState()

  useEffect(() => {
    fdc3.getSystemChannels().then(channels => {
      setChannels(channels)
    })

  }, [])

  const setSelectBackgroundColor = (channelId) => {
    const selectedChannel = channels.find(channels => channelId === channels.id);

    fdc3.joinChannel(channelId)

    const selectedChannelColor = selectedChannel.displayMetadata?.color;

    if (selectedChannelColor) {
      setSelectedChannelColor(selectedChannelColor)
    }
  }

  return (
    <div id="FSBLHeader">

      <div className="fsbl-header fsbl-tabs-enabled">
        <div className="linkerSection">
          <div className="fsbl-icon fsbl-linker" style={{ backgroundColor: selectedChannelColor }}>
            <MemoLinker fill="white" />
          </div>
          <select name="channels" id="channels" onChange={e => setSelectBackgroundColor(e.target.value)}>
            {channels.map(channel => <option key={channel.id} className="channel-option" style={{ color: `${channel.displayMetadata?.color}` }} value={channel.id}>{channel.id} </option>)}
          </select>
        </div>

      </div>

    </div>
  )
}
