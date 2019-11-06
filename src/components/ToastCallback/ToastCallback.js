import {Toast} from 'teaset'

const defaultDuration = 'short';
const defaultPosition = 'center';
const messageDefaultDuration = 'short';
const messageDefaultPosition = 'bottom';

export const ToastCallback = {
    message: (text, duration = messageDefaultDuration, callback, position) => {
        const time = duration === messageDefaultDuration ? 2000 : 3500;
        setTimeout(() => {
            callback()
        }, time);
        Toast.message(text, duration, position);
    }
};
