import React, { useState, useEffect } from 'react'
import { PaymentInputsContainer } from 'react-payment-inputs';
import styled from 'styled-components'
import Modal from '../Modal'
import { useAdvCheckoutModalOpen, useAdvCheckoutModalToggle  } from '../../state/application/hooks'
import {loadAdvcashForm, unloadAdvcashForm} from '../../advcash-form-script'

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: 0;
  padding: 10px;
  width: 100%;
  min-height: 150px;
`

export default function AdvCashCheckoutModal() {
  const simplexCheckoutModalOpen = useAdvCheckoutModalOpen()
  const simplexCheckoutModalToggle = useAdvCheckoutModalToggle()

  const [loadedSimplexFormScript, setLoadedSimpledFormScript] = useState(false);

  useEffect(() => {
    if (simplexCheckoutModalOpen && !loadedSimplexFormScript) {
      loadAdvcashForm(() => {
        setLoadedSimpledFormScript(true);
        // // @ts-ignore
        // const advcrypto = window;
        // const promise = advcrypto();
        // promise.then(function (data) {
        //   const currencies = data.supportedCryptoCurrencies;
        //   advcrypto.updateCryptoCurrency('BNB');
        //
        //   // @ts-ignore
        //   // console.log(document.querySelector('#checkout-element > iframe').contentWindow.document.querySelector('#simplex-iframe-form > div.powered-logo.justify-content-end > div > img'));
        // });
        //
        // simplex.on('submit', function (event) {
        //   // $('#simplex-form').removeClass('width-500');
        //   // $('#checkout-element').removeClass('width-450');
        // });
      });
    }

    if (!simplexCheckoutModalOpen && loadedSimplexFormScript) return unloadAdvcashForm(() => {
      setLoadedSimpledFormScript(false);
    });
    return undefined;
  }, [simplexCheckoutModalOpen, loadedSimplexFormScript])
  
  const formHTML = '<form id="simplex-form">\n' +
    '    <div id="main">' +
    '       <crypto-converter-widget noFooter="0" symbol="false" background-color="#FFFFFF" border-radius="0.60rem" fiat="united-states-dollar" crypto="bitcoin" amount="1" decimal-places="2"></crypto-converter-widget>' +
    '        <!-- checkout will be rendered here -->\n' +
    '    </div>\n' +
    '</form>'


  return (
    <Modal isOpen={simplexCheckoutModalOpen} onDismiss={simplexCheckoutModalToggle} minHeight={false} maxHeight={90}>
      <Wrapper>
        <div className="content" dangerouslySetInnerHTML={{ __html: formHTML }} />
        <PaymentInputsContainer>
          {({ meta, getCardNumberProps, getExpiryDateProps, getCVCProps }) => (
            <div>

              {meta.isTouched && meta.error && <span>Error: {meta.error}</span>}
            </div>
          )}
        </PaymentInputsContainer>
      </Wrapper>
    </Modal>
  )
}