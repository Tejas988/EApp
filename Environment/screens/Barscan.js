import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

barcodeRecognized = ({barcodes}) => {
  barcodes.forEach(barcode => console.warn(barcode.data));
};
const Barscan = () => {
  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          width: '100%',
        }}
        onGoogleVisionBarcodesDetected={this.barcodeRecognized}></RNCamera>
    </View>
  );
};

export {Barscan};
