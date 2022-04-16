@extends('layouts.app')

@section('title', 'Calendario')

@section('content')

<div class="container">
    <div id="agenda">

    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="evento" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Datos del Caledario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="" class="row g-3 needs-validation" novalidate>

                @csrf

                <div class="modal-body">
                    <div class="form-group d-none">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" name="id" id="id" aria-describedby="helpId"
                            placeholder="">
                        <small id="helpId" class="form-text text-muted"></small>
                    </div>

                    <div class="form-group">
                        <label for="title">Titulo</label>
                        <input type="text" class="form-control" name="title" id="title" aria-describedby="helpId"
                            required>
                        <small class="form-text text-muted color-danger">jgvgvfjg</small>
                        @error('title')
                        <div class="alert alert-danger">{{ $message }}</div>
                        @enderror

                    </div>

                    <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <textarea class="form-control" name="descripcion" id="descripcion" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="start">Start</label>
                        <input type="text" class="form-control" name="start" id="start" aria-describedby="helpId"
                            placeholder="">
                        <small id="helpId" class="form-text text-muted">Help text</small>
                    </div>

                    <div class="form-group">
                        <label for="end">End</label>
                        <input type="text" class="form-control" name="end" id="end" aria-describedby="helpId"
                            placeholder="">
                        <small id="helpId" class="form-text text-muted">Help text</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnGuardar">
                        Guardar
                    </button>
                    <button type="button" class="btn btn-primary" id="btnModificar">
                        Modificar
                    </button>
                    <button type="button" class="btn btn-danger" id="btnEliminar">
                        Eliminar
                    </button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                        Cerrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection