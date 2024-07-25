import { View, Text } from 'react-native'
import React from 'react'
import { SourceSansText } from '../StyledText'
import MyText from '../atom/MyText'
// import { SourceSansText } from '../atom/StyledText'

export default function LiveTime() {
    const [time, setTime] = React.useState('')

    React.useEffect(() => {

        let interval = setInterval(() => {
            const currentTime = formatAMPM();
            // console.log(currentTime, "currentTime");
            setTime(currentTime);
        }, 1000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    function formatAMPM() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let sec = date.getSeconds().toString();
        if (sec.length == 1) {
            sec = '0' + sec;
        }

        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ':' + sec + ' ' + ampm;
        return strTime;
    }

    return (
        <View>
            <View style={{ padding: 2 }}>
                <MyText textFont='source-sans' text={new Date().toDateString()} fontSize={20} />

                {/* <SourceSansText style={{ fontSize: 20 }}>{new Date().toDateString()}</SourceSansText> */}
                {/* <SourceSansText style={{ fontSize: 15, color: 'grey' }}>Schedule | 09:00 - 05:00</SourceSansText> */}
                <MyText textFont='source-sans' text={time} fontSize={25} />

                {/* <SourceSansText style={{ fontSize: 25 }}>{time}</SourceSansText> */}

            </View>

        </View>
    )
}