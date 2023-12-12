const elements = {
	
	popup: {
			two_factor_authen: function(param){
				var sample = ''
				+ '<div id="OTP_MODAL" class="modal fade" tabindex="-1">'
				+ ' 	<div class="modal-dialog modal-dialog-centered">'
				+ ' 		<div class="modal-content">'
				+ ' 			<div class="modal-header">'
				+ ' 				<h5 class="modal-title">Two Factor Authentication</h5>'
				+ ' 				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
				+ '				</div>'
				+ ' 			<div class="modal-body">'
				+ ' 				<form>'
				+ ' 					<div class="form-group">'
				+ ' 						<label for="recipient-name" class="col-form-label">OTP CODE:</label>'
				+ ' 						<input type="text" class="form-control" id="OTP_CODE">'
				+ ' 					</div>'
				+ ' 				</form>'
				+ ' 			</div>'
				+ '				<div class="modal-footer">'
				+ '					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>'
				+ '					<button type="button" class="btn btn-primary" id="VERIFY_OTP_BTN">Submit</button>'
				+ '				</div>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>';
				return sample;
			},
			
			forgot_password: function(param) {
				var sample = ''
				+ '<div id="FORGOT_PASSWORD_MODAL" class="modal fade" tabindex="-1">'
				+ ' 	<div class="modal-dialog modal-dialog-centered">'
				+ ' 		<div class="modal-content">'
				+ ' 			<div class="modal-header">'
				+ ' 				<h5 class="modal-title">Reset Password</h5>'
				+ ' 				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
				+ '				</div>'
				+ ' 			<div class="modal-body">'
				+ ' 				<div class="row justify-content-center">'
				+ ' 					<div class="col-md-12 col-lg-12 col-xl-12">'
				+ ' 						<div class="mt-4">'
				+ ' 							<div class="card-body p-4">'
				+ ' 								<div class="text-center mt-2">'
				+ ' 									<h5 class="text-primary">Forgot Password?</h5>'
				+ ' 									<p class="text-muted">Reset password with AtwoM</p>'
				+ ' 									<lord-icon src="https://cdn.lordicon.com/rhvddzym.json" trigger="loop" colors="primary:#0ab39c" class="avatar-xl">'
				+ ' 									</lord-icon>'
				+ ' 								</div>'
				+ ' 								<div class="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">'
				+ ' 									Enter your email and instructions will be sent to you!'
				+ ' 								</div>'
				+ ' 								<div class="p-2">'
				+ ' 									<form>'
				+ ' 										<div class="mb-4">'
				+ ' 											<label class="form-label">Email</label>'
				+ ' 											<input type="email" class="form-control" id="EMAIL" placeholder="Enter Email">'
				+ ' 										</div>'
				+ ' 										<div class="text-center mt-4">'
				+ ' 											<button class="btn btn-success w-100" type="button" id="RESET_PASSWORD_BTN">Send</button>'
				+ ' 										</div>'
				+ ' 									</form>'
				+ ' 								</div>'
				+ ' 							</div>'
				+ ' 						</div>'
				+ ' 					</div>'
				+ ' 				</div>'
				+ ' 			</div>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>';
				return sample;
			},

			email_verify_opt: function(param) {
				var sample = ''
				+ '<div id="EMAIL_OTP_MODAL" class="modal fade" tabindex="-1">'
				+ ' 	<div class="modal-dialog modal-dialog-centered">'
				+ ' 		<div class="modal-content">'
				+ ' 			<div class="modal-header">'
				+ ' 				<h5 class="modal-title">Email Verification</h5>'
				+ ' 				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
				+ '				</div>'
				+ ' 			<div class="modal-body">'
				+ '					<div class="mb-4">'		
				+ '						<div class="avatar-lg mx-auto">'
				+ '							<div class="avatar-title bg-light text-primary display-5 rounded-circle shadow">'
				+ '								<i class="ri-mail-line"></i>'
				+ '							</div>'
				+ '						</div>'
				+ '					</div>'
				+ '					<div class="text-muted text-center mx-lg-3">'
				+ '						<h4 class="">Verify Your Email</h4>'
				+ '						<p>Please enter the 6 digit code sent to <span class="fw-semibold">'+ param.email +'</span></p>'
				+ '					</div>'
				+ '					<div class="mt-4">'
				+ '						<form>'
				+ '							<div class="row">'
				+ '								<div class="col-12">'
				+ '									<div class="mb-3">'
				+ '										<label for="digit1-input" class="visually-hidden">OTP CODE</label>'
				+ '										<input type="text" class="form-control form-control-lg bg-light border-light text-center" id="EMAIL_OTP_CODE" maxLength="6">'
				+ '									</div>'
				+ '								</div>'
				+ '							</div>'
				+ '							<div class="mt-3">'
				+ '								<button type="button" class="btn btn-success w-100" id="EMAIL_VERIFY_OTP_BTN">Confirm</button>'
				+ '							</div>'
				+ '						</form>'
				+ '					</div>'
				+ '					<div class="mt-5 text-center">'
				+ '						<p class="mb-0">Did not receive a code ? <a href="javascript:void(0)" id="RESEND_BTN" class="fw-semibold text-primary text-decoration-underline">Resend</a> </p>'
				+ '					</div>'
				+ ' 			</div>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>';
				return sample;
			},
			
			active_account: function(param) {
				var sample = ''
				+ '<div id="EMAIL_OTP_MODAL" class="modal fade" tabindex="-1">'
				+ ' 	<div class="modal-dialog modal-dialog-centered">'
				+ ' 		<div class="modal-content">'
				+ ' 			<div class="modal-header">'
				+ ' 				<h5 class="modal-title">Email Verification</h5>'
				+ ' 				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
				+ '				</div>'
				+ ' 			<div class="modal-body">'
				+ '					<div class="mb-4">'		
				+ '						<div class="avatar-lg mx-auto">'
				+ '							<div class="avatar-title bg-light text-primary display-5 rounded-circle shadow">'
				+ '								<i class="ri-mail-line"></i>'
				+ '							</div>'
				+ '						</div>'
				+ '					</div>'
				+ '					<div class="text-muted text-center mx-lg-3">'
				+ '						<h4 class="">Verify Your Email</h4>'
				+ '						<p>Please enter the 6 digit code sent to your email<span class="fw-semibold"></span></p>'
				+ '					</div>'
				+ '					<div class="mt-4">'
				+ '						<form>'
				+ '							<div class="row">'
				+ '								<div class="col-12">'
				+ '									<div class="mb-3">'
				+ '										<label for="digit1-input" class="visually-hidden">OTP CODE</label>'
				+ '										<input type="text" class="form-control form-control-lg bg-light border-light text-center" id="EMAIL_OTP_CODE" maxLength="6">'
				+ '									</div>'
				+ '								</div>'
				+ '							</div>'
				+ '							<div class="mt-3">'
				+ '								<button type="button" class="btn btn-success w-100" id="EMAIL_VERIFY_OTP_BTN">Confirm</button>'
				+ '							</div>'
				+ '						</form>'
				+ '					</div>'
				+ '					<div class="mt-5 text-center">'
				+ '						<p class="mb-0">Did not receive a code ? <a href="javascript:void(0)" id="RESEND_BTN" class="fw-semibold text-primary text-decoration-underline">Resend</a> </p>'
				+ '					</div>'
				+ ' 			</div>'
				+ '			</div>'
				+ '		</div>'
				+ '	</div>';
				return sample;
			},
		}
};