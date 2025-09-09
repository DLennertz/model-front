import React, { useEffect, useState } from "react";
import ModeloService from "../../../services/ModelService";
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import Modal from "react-modal";
import "./InputModelFind.css";

/* Acessibilidade do react-modal (chame uma vez) */
Modal.setAppElement("#root");

const InputModelFind = () => {
  const [modelo, setModelo] = useState(null); // null = fechado
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const validations = yup.object().shape({
    valor: yup
      .number()
      .typeError("Informe um número válido")
      .integer("Somente número inteiro")
      .min(1, "ID mínimo 1")
      .required("Obrigatório"),
  });

  const handleSubmit = async ({ valor }) => {
    try {
      setErro("");
      setLoading(true);

      // Se seu service exporta OBJETO default (recomendado):
      const resp = await ModeloService.getModeloId(valor);

      // Se exporta CLASSE default, use:
      // const service = new ModeloService();
      // const resp = await service.getModeloId(valor);

      setModelo(resp || {}); // abre modal
    } catch (e) {
      console.error(e);
      setErro("Não foi possível obter o modelo. Tente novamente.");
      setModelo(null);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setModelo(null);

  const fotoUrl =
    modelo?.photos && modelo.photos.length > 0 ? modelo.photos[0].url : "";

  return (
    <>
      <p>Digite o ID do modelo desejado abaixo:</p>

      <Formik
        initialValues={{ valor: "" }}
        validationSchema={validations}
        onSubmit={handleSubmit}
      >
        <Form className="Form">
          <div className="caixa">
            <div className="Form_Group" id="campoId">
              <Field name="valor" className="Form_Field" placeholder="ID" />
              <ErrorMessage
                component="span"
                name="valor"
                className="Form_Error"
              />
            </div>

            <button className="Form_Btn" type="submit" disabled={loading}>
              {loading ? "Procurando..." : "Procurar"}
            </button>

            {erro && (
              <div className="Form_Error" style={{ marginTop: 8 }}>
                {erro}
              </div>
            )}
          </div>

          <Modal
            isOpen={!!modelo}
            onRequestClose={closeModal}
            className="Modal_Form"
            overlayClassName="Modal_Overlay"
            shouldCloseOnOverlayClick
          >
            <div className="caixaModal">
              <div className="ModalColumn" id="foto">
                {fotoUrl ? (
                  <img alt="Foto da modelo" src={fotoUrl} id="fotoModal" />
                ) : (
                  <div className="fotoPlaceholder">Sem foto</div>
                )}
              </div>

              <div className="ModalColumn" id="medidas">
                <p>
                  <strong>Altura: </strong>
                  {modelo?.height ?? "-"}
                </p>
                <p>
                  <strong>Bust: </strong>
                  {modelo?.bust ?? "-"}
                </p>
                <p>
                  <strong>Waist: </strong>
                  {modelo?.waist ?? "-"}
                </p>
                <p>
                  <strong>Hips: </strong>
                  {modelo?.hips ?? "-"}
                </p>
                <p>
                  <strong>Olhos: </strong>
                  {modelo?.eyeColor ?? "-"}
                </p>
                <p>
                  <strong>Cabelos: </strong>
                  {modelo?.hairColor ?? "-"}
                </p>
                <p>
                  <strong>Data: </strong>
                  {modelo?.dataNascimento ?? "-"}
                </p>
                <p>
                  <strong>País: </strong>
                  {modelo?.country ?? "-"}
                </p>
              </div>

              <div className="ModalColumn" id="info">
                <p>
                  <strong>ID: </strong>
                  {modelo?.id ?? "-"}
                </p>
                <p>
                  <strong>Nome: </strong>
                  {modelo?.nomeCompleto ?? "-"}
                </p>
                <p>
                  <strong>Rating: </strong>
                  {modelo?.rating ?? "-"}
                </p>
                <p>
                  <strong>Position: </strong>
                  {modelo?.position ?? "-"}
                </p>
                <p>
                  <strong>Boys: </strong>
                  {modelo?.boys ?? "-"}
                </p>
                <p>
                  <strong>Girls: </strong>
                  {modelo?.girls ?? "-"}
                </p>

                <button onClick={closeModal} id="buttonModalFechar">
                  Fechar
                </button>
              </div>
            </div>
          </Modal>
        </Form>
      </Formik>
    </>
  );
};

export default InputModelFind;
