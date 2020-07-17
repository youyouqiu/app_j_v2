import {Toast} from '@new-space/teaset'

const defaultDuration = 'short';
const defaultPosition = 'center';
const messageDefaultDuration = 'short';
const messageDefaultPosition = 'bottom';

export const ToastCallback = {
    message: (text, duration = messageDefaultDuration, callback, position) => {
        const time = duration === messageDefaultDuration ? 2000 : 3500;
        setTimeout(() => {
            callback && callback()
        }, time);
        const options = {
            modal: true,
            text, duration, position
        };
        Toast.show(options)
    }
};
