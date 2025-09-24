import React, { useEffect, useMemo, useState } from "react";
import "../InputModelUpdate/InputModelUpdate.css";

import EyeColorService from "../../../services/EyeColorService";
import HairColorService from "../../../services/HairColorService";
import CountryService from "../../../services/CountryService";
import ModelService from "../../../services/ModelService";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const InputModelUpdate = () => {
  // listas para selects
  const [eyeColors, setEyeColor] = useState([]);
  const [hairColors, setHairColor] = useState([]);
  const [countries, setCountry] = useState([]);

  // modelo carregado por ID
  const [model, setModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // carrega opções (desembrulhando .data se for AxiosResponse)
  useEffect(() => {
    (async () => {
      try {
        const ec = await EyeColorService.getEyeColor();
        setEyeColor(ec?.data ?? ec);

        const hc = await HairColorService.getHairColor();
        setHairColor(hc?.data ?? hc);

        const co = await CountryService.getCountry();
        setCountry(co?.data ?? co);
      } catch (e) {
        console.error("Erro ao carregar listas:", e);
      }
    })();
  }, []);

  // options normalizadas (ids como string)
  const countryOptions = useMemo(
    () =>
      (countries || []).map((c) => ({
        value: String(c.id ?? c.idCountry),
        label: c.name ?? c.nameCountry,
      })),
    [countries]
  );

  const eyeOptions = useMemo(
    () =>
      (eyeColors || []).map((e) => ({
        value: String(e.idEyeColor ?? e.id),
        label: e.eyeColor ?? e.name,
      })),
    [eyeColors]
  );

  const hairOptions = useMemo(
    () =>
      (hairColors || []).map((h) => ({
        value: String(h.idHairColor ?? h.id),
        label: h.hairColor ?? h.name,
      })),
    [hairColors]
  );

  // util: nome -> id (case-insensitive) baseado nas opções carregadas
  const nameToId = (opts, label) => {
    if (!label) return "";
    const norm = String(label).trim().toLowerCase();
    const hit = opts.find(
      (o) => o.label && o.label.trim().toLowerCase() === norm
    );
    return hit ? hit.value : "";
  };

  // valores iniciais; dependem também das options para converter nome->id
  const initialValues = useMemo(() => {
    const idCountry =
      model?.idCountry != null
        ? String(model.idCountry)
        : nameToId(countryOptions, model?.country);

    const idEyeColor =
      model?.idEyeColor != null
        ? String(model.idEyeColor)
        : nameToId(eyeOptions, model?.eyeColor);

    const idHairColor =
      model?.idHairColor != null
        ? String(model.idHairColor)
        : nameToId(hairOptions, model?.hairColor);

    const normalizeRating = (r) => {
      if (r == null || r === "") return "";
      const n = typeof r === "number" ? r : parseFloat(r);
      if (Number.isNaN(n)) return "";
      return n.toFixed(1); // "10.0", "9.5", "8.0" etc.
    };

    return {
      id: model?.id ?? "",
      nome: model?.nomeCompleto ?? "",
      niver: model?.dataNascimento ?? "",
      idCountry: idCountry || "",
      height: model?.height ?? "",
      idEyeColor: idEyeColor || "",
      idHairColor: idHairColor || "",
      bust: model?.bust ?? "",
      waist: model?.waist ?? "",
      hips: model?.hips ?? "",
      rating: normalizeRating(model?.rating),
      boys: model?.boys ?? "",
      girls: model?.girls ?? "",
      foto: model?.foto ?? model?.photos?.[0]?.url ?? "",
    };
  }, [model, countryOptions, eyeOptions, hairOptions]);

  const schema = yup.object({
    id: yup.number().typeError("ID inválido").integer().min(1).required(),
    nome: yup.string().required("Informe o nome"),
    niver: yup.string().required("Informe a data"),
    idCountry: yup.string().required("País obrigatório"),
    height: yup.string().required("Altura obrigatória"),
    rating: yup.string().nullable(),
  });

  // buscar modelo por ID
  const fetchById = async (id) => {
    if (!id) return;
    try {
      setFetchError("");
      setLoadingModel(true);

      const resp = await ModelService.getModeloId(id);
      const data = resp?.data ?? resp;

      setModel({
        ...data,
        // guardamos também os nomes, caso ids venham null
        _countryName: data.country ?? data.country?.name ?? "",
        _eyeColorName: data.eyeColor ?? data.eyeColor?.eyeColor ?? "",
        _hairColorName: data.hairColor ?? data.hairColor?.hairColor ?? "",
        foto: data.foto ?? data.photos?.[0]?.url ?? "",
      });
    } catch (e) {
      console.error(e);
      setFetchError("Não foi possível carregar o modelo.");
      setModel(null);
    } finally {
      setLoadingModel(false);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        id: Number(values.id),
        nomeCompleto: values.nome,
        dataNascimento: values.niver,
        idCountry: values.idCountry, // string ok
        height: values.height,
        idEyeColor: values.idEyeColor,
        idHairColor: values.idHairColor,
        bust: values.bust,
        waist: values.waist,
        hips: values.hips,
        rating: values.rating,
        boys: values.boys,
        girls: values.girls,
        photos: values.foto ? [{ url: values.foto }] : [],
      };

      const fd = new FormData();
      fd.append(
        "modelVO",
        new Blob([JSON.stringify(payload)], { type: "application/json" })
      );

      await ModelService.updateModeloSemFoto(fd);

      alert("Atualização bem-sucedida!");
      setModel((m) => ({ ...(m || {}), ...payload }));
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form className="Form">
          <p>Atualizar Modelo</p>

          {/* ID + Buscar */}
          <div className="Form_div" id="id">
            <div className="Form_Group" style={{ maxWidth: 220 }}>
              <label htmlFor="idField" className="Form_Label">
                ID
              </label>
              <Field
                name="id"
                id="idField"
                className="Form_Field"
                placeholder="ID"
              />
              <ErrorMessage component="span" name="id" className="Form_Error" />
            </div>
            <button
              type="button"
              className="Form_Btn"
              onClick={() => fetchById(values.id)}
              disabled={loadingModel}
              style={{ alignSelf: "end", height: 44 }}
            >
              {loadingModel ? "Buscando..." : "Buscar"}
            </button>
            {fetchError && <span className="Form_Error">{fetchError}</span>}
          </div>

          {/* Info pessoal */}
          <div className="Form_div" id="infoPessoal">
            <div className="Form_Group">
              <label className="Form_Label" htmlFor="nome">
                Nome
              </label>
              <Field
                name="nome"
                className="Form_Field"
                id="nome"
                placeholder="Nome Completo"
              />
              <ErrorMessage
                component="span"
                name="nome"
                className="Form_Error"
              />
            </div>

            <div className="Form_Group">
              <label className="Form_Label" htmlFor="idCountry">
                País
              </label>
              <Field
                as="select"
                name="idCountry"
                className="Form_Field"
                id="idCountry"
              >
                <option value="">--Escolha um país--</option>
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                component="span"
                name="idCountry"
                className="Form_Error"
              />
            </div>

            <div className="Form_Group">
              <label className="Form_Label" htmlFor="niver">
                Nascimento
              </label>
              <Field
                type="date"
                name="niver"
                className="Form_Field"
                id="niver"
              />
              <ErrorMessage
                component="span"
                name="niver"
                className="Form_Error"
              />
            </div>
          </div>

          {/* Medidas */}
          <div className="Form_div" id="medidas">
            {[
              ["height", "Altura"],
              ["bust", "Bust"],
              ["waist", "Waist"],
              ["hips", "Hips"],
            ].map(([name, label]) => (
              <div className="Form_Group" key={name}>
                <label className="Form_Label" htmlFor={name}>
                  {label}
                </label>
                <Field name={name} className="Form_Field" id={name} />
                <ErrorMessage
                  component="span"
                  name={name}
                  className="Form_Error"
                />
              </div>
            ))}
          </div>

          {/* Aparência */}
          <div className="Form_div" id="aparencia">
            <div className="Form_Group">
              <label className="Form_Label" htmlFor="idEyeColor">
                Olhos
              </label>
              <Field
                as="select"
                name="idEyeColor"
                className="Form_Field"
                id="idEyeColor"
              >
                <option value="">--Escolha cor de olhos--</option>
                {eyeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                component="span"
                name="idEyeColor"
                className="Form_Error"
              />
            </div>

            <div className="Form_Group">
              <label className="Form_Label" htmlFor="idHairColor">
                Cabelos
              </label>
              <Field
                as="select"
                name="idHairColor"
                className="Form_Field"
                id="idHairColor"
              >
                <option value="">--Escolha cor de cabelo--</option>
                {hairOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                component="span"
                name="idHairColor"
                className="Form_Error"
              />
            </div>

            <div className="Form_Group">
              <label className="Form_Label" htmlFor="rating">
                Rating
              </label>
              <Field
                as="select"
                name="rating"
                className="Form_Field"
                id="rating"
              >
                <option value="">Rating</option>
                {[
                  "10.0",
                  "9.5",
                  "9.0",
                  "8.5",
                  "8.0",
                  "7.5",
                  "7.0",
                  "6.5",
                  "6.0",
                ].map((v) => (
                  <option key={v} value={v}>
                    {v.replace(".0", "")}
                  </option> // label sem .0 é ok
                ))}
              </Field>
              <ErrorMessage
                component="span"
                name="rating"
                className="Form_Error"
              />
            </div>
          </div>

          {/* Outros */}
          <div className="Form_div" id="filhos">
            <div className="Form_Group">
              <label className="Form_Label" htmlFor="boys">
                Boys
              </label>
              <Field name="boys" className="Form_Field" id="boys" />
            </div>
            <div className="Form_Group">
              <label className="Form_Label" htmlFor="girls">
                Girls
              </label>
              <Field name="girls" className="Form_Field" id="girls" />
            </div>
            <div className="Form_Group">
              <label className="Form_Label" htmlFor="foto">
                Foto (URL)
              </label>
              <Field
                name="foto"
                className="Form_Field"
                id="foto"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="Form_div" id="campoButao">
            <button className="Form_Btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Atualizar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InputModelUpdate;
